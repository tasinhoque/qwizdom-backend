const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const {
  quizService,
  stageService,
  questionService,
  userService,
  quizResponseService,
} = require('../services');

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
  const {
    page,
    limit,
    isTest,
    isTimeBound,
    isScheduled,
    name,
    categories,
    isPublished,
  } = req.query;
  const filter = {
    isTest,
    duration: { $exists: isTimeBound },
    isScheduled: isScheduled === 'true',
    name: { $regex: name, $options: 'i' },
    categories: { $in: categories },
    isPublished,
  };

  if (isPublished === undefined) {
    delete filter.isPublished;
  }

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
    delete filter.isScheduled;
  }

  if (categories === undefined) {
    delete filter.categories;
  }

  const quizzes = await quizService.get(filter, {
    page,
    limit,
    populate: 'creator categories',
    sortBy: 'totalParticipants:desc',
  });
  res.status(httpStatus.OK).send(quizzes);
});

const getById = catchAsync(async (req, res) => {
  const quiz = await quizService.getById(req.params.quizId);
  res.status(httpStatus.OK).send(quiz);
});

const getByIdComplete = catchAsync(async (req, res) => {
  const { quizId } = req.params;
  let quiz = await quizService.getById(quizId);
  quiz = { ...quiz.toJSON(), stages: [] };

  const stages = await stageService.getByQuiz(quizId);

  for (const stage of stages) {
    const questions = await questionService.getByStage(stage._id);
    quiz.stages = [...quiz.stages, { stage, questions }];
  }

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
  const quiz = await quizService.update(req.params.quizId, {
    coverImage: res.locals.publicUrl,
  });
  res.status(httpStatus.OK).send(quiz);
});

const createComplete = catchAsync(async (req, res) => {
  const { isPublished, stages } = req.body;
  const { quizId } = req.params;
  let totalPoints = 0;

  await quizService.update(
    quizId,
    isPublished !== undefined ? { isPublished } : {}
  );

  const existingStages = await stageService.getByQuiz(quizId);

  for (const stage of existingStages) {
    await questionService.deleteByStage(stage.id);
  }

  await stageService.deleteByQuiz(quizId);

  let localStages = [];
  let j = 0;
  let i = 0;

  for (const { questions } of stages) {
    const stage = await stageService.create({
      quiz: quizId,
      serial: j,
    });
    j++;

    let localQuestions = [];

    for (const { questionId, ...questionFields } of questions) {
      const question = await questionService.create({
        stage: stage.id,
        ...questionFields,
        serial: i,
      });
      localQuestions = [...localQuestions, question];
      totalPoints += questionFields.points;
      i++;
    }

    localStages = [...localStages, { stage, questions: localQuestions }];
  }

  await quizService.update(quizId, { totalPoints });

  res.status(httpStatus.OK).send({ quizId, stages: localStages, totalPoints });
});

const updateComplete = catchAsync(async (req, res) => {
  const { stages } = req.body;
  const { quizId } = req.params;

  let totalPoints = 0;
  let localStages = [];
  let j = 0;
  let i = 0;

  for (const { questions, id } of stages) {
    let stage;
    if (id !== undefined) {
      stage = await stageService.update(id, {
        serial: j,
      });
    } else {
      stage = await stageService.create({
        quiz: quizId,
        serial: j,
      });
    }
    j++;

    let localQuestions = [];

    for (const { id, ...questionFields } of questions) {
      let question;

      if (id !== undefined) {
        question = await questionService.update(id, {
          stage: stage.id,
          ...questionFields,
          serial: i,
        });
      } else {
        question = await questionService.create({
          stage: stage.id,
          ...questionFields,
          serial: i,
        });
      }
      localQuestions.push(question);
      totalPoints += questionFields.points;
      i++;
    }

    localStages.push({ stage, questions: localQuestions });
  }

  res.status(httpStatus.OK).send({ quizId, stages: localStages, totalPoints });
});

const getSubscriberCount = async (req, res) => {
  const count = await userService.getSubscriberCount(req.params.quizId);
  res.status(200).send({ count });
};

const getParticipantCount = async (req, res) => {
  const response = await quizResponseService.getParticipantCount(
    req.params.quizId
  );

  res.status(200).send({
    count: response[0].totalParticipants || 0,
  });
};

const remove = catchAsync(async (req, res) => {
  const { quizId } = req.params;

  await quizService.remove(quizId);
  await stageService.deleteByQuiz(quizId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  update,
  get,
  getByCreator,
  getById,
  updateCover,
  createComplete,
  getByIdComplete,
  getSubscriberCount,
  getParticipantCount,
  updateComplete,
  remove,
};
