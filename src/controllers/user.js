const httpStatus = require('http-status');
const { pick, ApiError, catchAsync } = require('../utils');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
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
  const user = await userService.getUserById(req.params.userId);

  let update = {};
  const innerContent = { subscribedQuizzes: req.params.quizId };

  if (user.subscribedQuizzes.includes(req.params.quizId)) {
    update = { $pull: innerContent };
  } else {
    update = { $push: innerContent };
  }

  await userService.update(req.params.userId, update);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSubscribedQuizzes = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId, 'subscribedQuizzes');
  res.status(httpStatus.OK).send(user.subscribedQuizzes);
});

const getQuizResponses = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId, 'quizResponses');
  res.status(httpStatus.OK).send(user.quizResponses);
});

const getCreatedQuizzes = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId, 'createdQuizzes');
  let result = [];

  if (req.originalUrl.endsWith('draft')) {
    result = user.createdQuizzes.filter((quiz) => quiz.isPublished === false);
  } else {
    result = user.createdQuizzes.filter((quiz) => quiz.isPublished === true);
  }

  res.status(httpStatus.OK).send(result);
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
