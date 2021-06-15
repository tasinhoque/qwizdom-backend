const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { logger } = require('../config');
const { quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  logger.info(JSON.stringify({ user: req.user }));
  // const quiz = await quizService.create(req.body);
  res.status(httpStatus.CREATED).send(req.user);
});

const update = catchAsync(async (req, res) => {
  const quiz = await quizService.update(req.params.quizId, req.body);
  res.status(httpStatus.OK).send(quiz);
});

const get = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const quizzes = await quizService.get({}, { page, limit });
  res.status(httpStatus.OK).send(quizzes);
});

module.exports = {
  create,
  update,
  get,
};
