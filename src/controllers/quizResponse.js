const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const {
  quizResponseService,
  questionResponseService,
  questionService,
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
      const questionDoc = await questionService.getById(questionId);
      let points = 0;

      if (questionDoc.type === 'trueOrFalse') {
        let totalCorrectAnswers = 0;
        for (const i = 0; i < questionDoc.options.length; i++) {
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

        for (const i = 0; i < questionDoc.options.length; i++) {
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

      totalPoints += point;
      localResponses.push(questionResponse.id);
    }

    localStageResponses.push({
      stage: stageResponse.stageId,
      responses: localResponses,
    });
  }

  const body = {
    stageResponses: localStageResponses,
    quiz: req.params.quizId,
    responder: req.user.id,
    totalPoints,
  };
  const quizResponse = await quizResponseService.create(body);
  res.status(httpStatus.CREATED).send(quizResponse);
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

module.exports = {
  create,
  getByUser,
  createComplete,
  getByQuizAndUser,
};
