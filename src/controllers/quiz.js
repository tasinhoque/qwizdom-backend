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
  const { page, limit, isTest, isTimeBound, isScheduled } = req.query;
  const filter = {
    isTest,
    duration: { $exists: isTimeBound },
    startTime: { $exists: isScheduled },
  };

  if (isTest === undefined) {
    delete filter.isTest;
  }

  if (isTimeBound === undefined) {
    delete filter.duration;
  }

  if (isScheduled === undefined) {
    delete filter.startTime;
  }

  const quizzes = await quizService.get(filter, { page, limit, populate: 'creator' });
  res.status(httpStatus.OK).send(quizzes);
});

const getByCreator = catchAsync(async (req, res) => {
  const filter = {};

  if (req.originalUrl.endsWith('draft')) {
    filter.isPublished = false;
  } else {
    filter.isPublished = true;
  }

  const quizzes = await quizService.getByCreator(req.user.id, filter);
  res.status(httpStatus.OK).send(quizzes);
});

module.exports = {
  create,
  update,
  get,
  getByCreator,
};
