const { quizResponseService } = require('../services');
const { catchAsync } = require('../utils');
const httpStatus = require('http-status');

const get = catchAsync(async (req, res) => {
  let response = await quizResponseService.getCreatedAts(req.params.quizId);
  const createdAts = response.map(({ createdAt }) => createdAt);

  response = await quizResponseService.getByQuizForLeaderboard(
    req.params.quizId,
    createdAts
  );

  res.status(httpStatus.OK).send(response);
});

module.exports = { get };
