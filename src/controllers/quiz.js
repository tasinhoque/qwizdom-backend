const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizService, stageService, questionService } = require('../services');
// const { logger } = require('../config');

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

const createComplete = catchAsync(async (req, res) => {
  const { quizId, stages } = req.body;

  let localStages = [];

  for (let i = 0; i < stages.length; i += 1) {
    const { questions } = stages[i];
    const parent = i > 0 ? localStages[i - 1].stageId : undefined;

    const stage = await stageService.create({
      quiz: quizId,
      parent,
    });

    let localQuestions = [];

    for (let j = 0; j < questions.length; j += 1) {
      const { questionId, ...questionArg } = questions[j];
      const question = await questionService.create({ stage: stage.id, ...questionArg });
      localQuestions = [...localQuestions, question];
    }

    localStages = [...localStages, { stageId: stage.id, questions: localQuestions }];
  }

  if (localStages.length > 0) {
    await quizService.update(quizId, { firstStage: localStages[0].stageId });
  }

  res.status(httpStatus.OK).send({ quizId, stages: localStages });
});

module.exports = {
  create,
  update,
  get,
  getByCreator,
  getById,
  updateCover,
  createComplete,
};
