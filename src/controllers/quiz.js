const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    creator: req.user.id,
  };

  const quiz = await quizService.create(body);
  res.status(httpStatus.CREATED).send(quiz);
});

const update = catchAsync(async (req, res) => {
  const quiz = await quizService.update(req.params.quizId, req.body);
  res.status(httpStatus.OK).send(quiz);
});

const get = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const quizzes = await quizService.get({}, { page, limit, populate: 'creator' });
  res.status(httpStatus.OK).send(quizzes);
});

module.exports = {
  create,
  update,
  get,
};
