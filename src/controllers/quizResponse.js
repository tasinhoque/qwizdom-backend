const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizResponseService, userService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = { ...req.body, quiz: req.params.quizId };
  const quizResponse = await quizResponseService.create(body);
  await userService.update(req.params.userId, { $push: { quizResponses: quizResponse.id } });
  res.status(httpStatus.CREATED).send(quizResponse);
});

module.exports = {
  create,
};
