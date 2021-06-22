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
  const { page, limit, isTest, isTimeBound, isScheduled, name, categories } = req.query;
  const filter = {
    isTest,
    duration: { $exists: isTimeBound },
    startTime: { $exists: isScheduled },
    name: { $regex: name, $options: 'ix' },
    categories: { $in: categories },
  };

  if (name === undefined) {
    delete filter.name;
  }

  if (isTest === undefined) {
    delete filter.isTest;
  }

  if (isTimeBound === undefined) {
    delete filter.duration;
  }

  if (isScheduled === undefined) {
    delete filter.startTime;
  }

  if (categories === undefined) {
    delete filter.categories;
  }

  const quizzes = await quizService.get(filter, { page, limit, populate: 'creator' });
  res.status(httpStatus.OK).send(quizzes);
});

const getById = catchAsync(async (req, res) => {
  const quiz = await quizService.getById(req.params.quizId);
  res.status(httpStatus.OK).send(quiz);
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

const updateCover = catchAsync(async (req, res) => {
  const quiz = await quizService.update(req.params.quizId, { coverImage: res.locals.publicUrl });
  res.status(httpStatus.OK).send(quiz);
});

module.exports = {
  create,
  update,
  get,
  getByCreator,
  getById,
  updateCover,
};
