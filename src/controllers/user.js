const httpStatus = require('http-status');
const { pick, ApiError, catchAsync } = require('../utils');
const {
  userService,
  quizService,
  quizResponseService,
} = require('../services');

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
  res.status(httpStatus).send(user);
});

const updateLoggedInUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.status(httpStatus.OK).send(user);
});

const updateAvatar = catchAsync(async (req, res) => {
  const user = await userService.update(req.user.id, {
    avatar: res.locals.publicUrl,
  });
  res.status(httpStatus.OK).send(user);
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
  let increment = 0;
  const innerContent = { subscribedQuizzes: req.params.quizId };

  if (user.subscribedQuizzes.includes(req.params.quizId)) {
    update = { $pull: innerContent };
    increment = -1;
  } else {
    update = { $push: innerContent };
    increment = 1;
  }

  await userService.update(req.user.id, update);
  await quizService.update(req.params.quizId, {
    $inc: { totalSubscribers: increment },
  });

  res.status(httpStatus.NO_CONTENT).send();
});

const getSubscribedQuizzes = catchAsync(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const user = await userService.getUserById(req.user.id, 'subscribedQuizzes');

  let results = user.subscribedQuizzes;
  const totalResults = results.length;
  results = results.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(totalResults / limit);

  res.status(httpStatus.OK).send({
    results,
    page,
    limit,
    totalPages,
    totalResults,
  });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  flipSubscription,
  getSubscribedQuizzes,
  updateLoggedInUser,
  updateAvatar,
};
