const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizResponseService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = { ...req.body, quiz: req.params.quizId, responder: req.user.id };
  const quizResponse = await quizResponseService.create(body);
  res.status(httpStatus.CREATED).send(quizResponse);
});

module.exports = {
  create,
};
