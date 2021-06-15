const httpStatus = require('http-status');
const { pick, ApiError, catchAsync } = require('../utils');
const { userService, quizResponseService, quizService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const flipSubscription = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);

  let update = {};
  const innerContent = { subscribedQuizzes: req.params.quizId };

  if (user.subscribedQuizzes.includes(req.params.quizId)) {
    update = { $pull: innerContent };
  } else {
    update = { $push: innerContent };
  }

  await userService.update(req.user.id, update);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSubscribedQuizzes = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id, 'subscribedQuizzes');
  res.status(httpStatus.OK).send(user.subscribedQuizzes);
});

const getQuizResponses = catchAsync(async (req, res) => {
  const quizResponses = await quizResponseService.getByUser(req.user.id);
  res.status(httpStatus.OK).send(quizResponses);
});

const getCreatedQuizzes = catchAsync(async (req, res) => {
  const quizzes = await quizService.getByUser(req.user.id);
  let results = [];

  if (req.originalUrl.endsWith('draft')) {
    results = quizzes.filter((quiz) => quiz.isPublished === false);
  } else {
    results = quizzes.filter((quiz) => quiz.isPublished === true);
  }

  res.status(httpStatus.OK).send(results);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  flipSubscription,
  getSubscribedQuizzes,
  getQuizResponses,
  getCreatedQuizzes,
};
