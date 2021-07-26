const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const {
  quizResponseService,
  questionResponseService,
  questionService,
  quizService,
  notificationService,
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
  const userId = req.user.id;
  const { quizId } = req.params;

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

  if (!quiz.hasAutoEvaluation) {
    const notification = await notificationService.getPending(
      quiz.creator,
      quizId
    );

    if (notification === null) {
      await notificationService.create({
        recipient: quiz.creator,
        quiz: quizId,
        type: 'pendingSubmission',
        link: `/quiz/${quizId}/submissions`,
        participants: [userId],
        text: `You have 1 pending submission to evaluate for your quiz '${quiz.name}'`,
      });
    } else {
      if (!notification.participants.includes(userId)) {
        await notificationService.update(notification.id, {
          isRead: false,
          $push: { participants: userId },
          text: `You have ${
            notification.participants.length + 1
          } pending submissions to evaluate for your quiz '${quiz.name}'`,
        });
      }
    }
  }

  res.status(httpStatus.CREATED).send(quizResponse);
});

const evaluate = catchAsync(async (req, res) => {
  const { quizResponseId } = req.params;
  const userId = req.user.id;

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

  const quiz = await quizService.getById(quizResponse.quiz);

  await notificationService.create({
    recipient: quizResponse.responder,
    text: "Your submission for '" + quiz.name + "' has been evaluated",
    link: `/quiz/${quizResponse.quiz}/result`,
  });

  const notification = await notificationService.getPending(userId, quiz.id);

  if (notification !== null) {
    if (notification.participants.length === 1) {
      await notificationService.remove(notification.id);
    } else {
      await notificationService.update(notification.id, {
        $pull: { participants: quizResponse.responder },
        text: `You have ${
          notification.participants.length - 1
        } pending submission to evaluate for your quiz '${quiz.name}'`,
      });
    }
  }

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
  const quizzes = query.map(({ quiz }) => String(quiz)).filter(unique);
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

          for (let i = 0; i < questionResponse.options.length; i++) {
            questionMap[question.id][question.options[i].text] =
              (questionMap[question.id][question.options[i].text] || 0) +
              Number(questionResponse.options[i]);
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

  pieChartData.sort((a, b) => a.question.serial - b.question.serial);
  res.status(httpStatus.OK).send(pieChartData);
});

const getTaskPageData = catchAsync(async (req, res) => {
  const quizzes = await quizService.getByCreatorForTaskPage(req.user.id);

  let response = [];

  for (const quiz of quizzes) {
    let createdAtResponse = await quizResponseService.getCreatedAts(quiz.id);
    const createdAts = createdAtResponse.map(({ createdAt }) => createdAt);

    const count = await quizResponseService.getPendingCount(
      quiz.id,
      createdAts
    );

    if (count) {
      response.push({ quiz, count });
    }
  }

  res.status(httpStatus.OK).send(response);
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
  getTaskPageData,
};
