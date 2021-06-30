const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizResponseService, questionResponseService } = require('../services');

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

  for (const stageResponse of req.body.stageResponses) {
    let localResponses = [];

    for (const response of stageResponse.responses) {
      const { questionId: question, ...rest } = response;
      const questionResponse = await questionResponseService.create({
        question,
        responder: req.user.id,
        ...rest,
      });

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
    let lastResponse = quizResponses[0];
    // res.status(httpStatus.OK).send(lastResponse);

    // for (let k = 0; k < lastResponse.stageResponses.length; k++) {
    //   for (let i = 0; i < lastResponse.stageResponses[k].options.length; i++) {
    //     for (
    //       let j = 0;
    //       j < lastResponse.stageResponses[k].options.length;
    //       j++
    //     ) {
    //       lastResponse.stageResponses[k].question.options[j].userResponse =
    //         lastResponse.stageResponses[k].options[i];
    //     }
    //   }
    // }

    res.status(httpStatus.OK).send(lastResponse);
  }
});

module.exports = {
  create,
  getByUser,
  createComplete,
  getByQuizAndUser,
};
