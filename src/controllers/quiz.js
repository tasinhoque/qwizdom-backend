const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const quiz = await quizService.create(req.body);
  res.status(httpStatus.CREATED).send(quiz);
});

const update = catchAsync(async (req, res) => {
  const quiz = await quizService.update(req.params.quizId, req.body);
  res.status(httpStatus.OK).send(quiz);
});

module.exports = {
  create,
  update,
};
