const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const {
  quizResponseService,
  questionResponseService,
  questionService,
  quizService,
} = require('../services');

const getByUser = catchAsync(async (req, res) => {
  const quizResponses = await quizResponseService.getByUser(req.user.id);
  res.status(httpStatus.OK).send(quizResponses);
});

const create = catchAsync(async (req, res) => {
  const body = { ...req.body, quiz: req.params.quizId, responder: req.user.id };
  const quizResponse = await quizResponseService.create(body);
  res.status(httpStatus.CREATED).send(quizResponse);
});

const createComplete = catchAsync(async (req, res) => {
  let localStageResponses = [];
  let totalPoints = 0;

  for (const stageResponse of req.body.stageResponses) {
    let localResponses = [];

    for (const response of stageResponse.responses) {
      const { questionId: question, ...rest } = response;
      const questionDoc = await questionService.getById(question);
      let points = 0;

      if (questionDoc.type === 'trueOrFalse') {
        let totalCorrectAnswers = 0;
        for (let i = 0; i < questionDoc.options.length; i++) {
          if (questionDoc.options[i].isAnswer === rest.options[i]) {
            totalCorrectAnswers++;
          }
        }

        points =
          (totalCorrectAnswers * questionDoc.points) /
          questionDoc.options.length;
      } else if (
        questionDoc.type === 'mcq' ||
        questionDoc.type === 'checkbox'
      ) {
        let isCorrect = true;

        for (let i = 0; i < questionDoc.options.length; i++) {
          if (questionDoc.options[i].isAnswer !== rest.options[i]) {
            isCorrect = false;
            break;
          }
        }

        if (isCorrect) {
          points = questionDoc.points;
        }
      }

      const questionResponse = await questionResponseService.create({
        question,
        responder: req.user.id,
        points,
        ...rest,
      });

      totalPoints += points;
      localResponses.push(questionResponse.id);
    }

    localStageResponses.push({
      stage: stageResponse.stageId,
      responses: localResponses,
    });
  }

  totalPoints = parseFloat(totalPoints.toFixed(2));
  const body = {
    stageResponses: localStageResponses,
    quiz: req.params.quizId,
    responder: req.user.id,
    totalPoints,
  };

  const quiz = await quizService.getById(req.params.quizId);
  if (quiz.hasAutoEvaluation) {
    body.isEvaluated = true;
  }

  const quizResponse = await quizResponseService.create(body);

  const [element, ..._rest] = await quizResponseService.getParticipantCount(
    req.params.quizId
  );

  await quizService.update(req.params.quizId, element);

  res.status(httpStatus.CREATED).send(quizResponse);
});

const evaluate = catchAsync(async (req, res) => {
  const { quizResponseId } = req.params;

  for (const { points, questionResponseId } of req.body) {
    await questionResponseService.update(questionResponseId, {
      points,
    });
  }

  let quizResponse = await quizResponseService.getById(quizResponseId);
  let totalPoints = 0;

  for (const stageResponse of quizResponse.stageResponses) {
    for (const response of stageResponse.responses) {
      totalPoints += response.points;
    }
  }

  totalPoints = parseFloat(totalPoints.toFixed(2));
  quizResponse = await quizResponseService.update(quizResponseId, {
    totalPoints,
    isEvaluated: true,
  });

  res
    .status(httpStatus.OK)
    .send({ message: 'Total points is now ' + totalPoints });
});

const getByQuizAndUser = catchAsync(async (req, res) => {
  const quizResponses = await quizResponseService.getByQuizAndUser(
    req.params.quizId,
    req.user.id
  );

  if (quizResponses.length === 0) {
    res.status(httpStatus.OK).send([]);
  } else {
    res.status(httpStatus.OK).send(quizResponses[0]);
  }
});

const getByQuizAndUserOther = catchAsync(async (req, res) => {
  const quizResponses = await quizResponseService.getByQuizAndUser(
    req.params.quizId,
    req.params.userId
  );

  if (quizResponses.length === 0) {
    res.status(httpStatus.OK).send([]);
  } else {
    res.status(httpStatus.OK).send(quizResponses[0]);
  }
});

const quizzesParticipatedIn = catchAsync(async (req, res) => {
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const query = await quizResponseService.quizzesParticipatedIn(req.user.id);
  const quizzes = query.map(({ quiz }) => quiz).filter(unique);
  const results = [];

  for (const quiz of quizzes) {
    results.push(await quizService.getById(quiz));
  }

  res.status(httpStatus.OK).send(results);
});

const getByQuiz = catchAsync(async (req, res) => {
  let response = await quizResponseService.getCreatedAts(req.params.quizId);
  const createdAts = response.map(({ createdAt }) => createdAt);

  const { page, limit, type } = req.query;
  const filter = {
    quiz: req.params.quizId,
    createdAt: { $in: createdAts },
  };

  if (type !== undefined) {
    if (type === 'evaluated') {
      filter.isEvaluated = true;
    } else if (type === 'pending') {
      filter.isEvaluated = false;
    }
  }
  response = await quizResponseService.getByQuiz(filter, page, limit);

  res.status(200).send(response);
});

const getPieChartData = catchAsync(async (req, res) => {
  let response = await quizResponseService.getCreatedAts(req.params.quizId);
  const createdAts = response.map(({ createdAt }) => createdAt);

  response = await quizResponseService.getByQuizForPieChart(
    req.params.quizId,
    createdAts
  );

  let questionMap = {};

  for (const quizResponse of response) {
    for (const stageResponse of quizResponse.stageResponses) {
      for (const questionResponse of stageResponse.responses) {
        const question = questionResponse.question;

        if (question.type === 'mcq' || question.type === 'checkbox') {
          if (questionMap[question.id] === undefined) {
            questionMap[question.id] = {};
          }

          for (let i = 1; i <= questionResponse.options.length; i++) {
            questionMap[question.id][`option${i}`] =
              (questionMap[question.id][`option${i}`] || 0) + 1;
          }
        }
      }
    }
  }

  let pieChartData = [];
  await Promise.all(
    Object.keys(questionMap).map(async key => {
      const question = await questionService.getById(key);
      const array = Object.entries(questionMap[key]);
      const objects = [];

      for (const subArray of array) {
        objects.push({ title: subArray[0], value: subArray[1] });
      }

      pieChartData.push({
        question,
        data: objects,
      });
    })
  );

  res.status(httpStatus.OK).send(pieChartData);
});

module.exports = {
  create,
  getByUser,
  createComplete,
  getByQuizAndUser,
  getByQuiz,
  getByQuizAndUserOther,
  evaluate,
  quizzesParticipatedIn,
  getPieChartData,
};
