const { quizResponseService } = require('../services');
const { catchAsync } = require('../utils');
const httpStatus = require('http-status');

const get = catchAsync(async (req, res) => {
  let response = await quizResponseService.getCreatedAts(req.params.quizId);
  const createdAts = response.map(({ createdAt }) => createdAt);

  const evaluated = await quizResponseService.getByQuizForLeaderboardEvaluated(
    req.params.quizId,
    createdAts
  );

  const pending = await quizResponseService.getByQuizForLeaderboardPending(
    req.params.quizId,
    createdAts
  );

  res.status(httpStatus.OK).send({ evaluated, pending });
});

module.exports = { get };
