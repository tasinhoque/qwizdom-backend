const httpStatus = require('http-status');
const { pick, ApiError, catchAsync } = require('../utils');
const {
  userService,
  quizService,
  notificationService,
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
  const userId = req.user.id;
  const { quizId } = req.params;
  const user = await userService.getUserById(userId);

  let update = {};
  let increment = 0;
  const innerContent = { subscribedQuizzes: quizId };
  const quiz = await quizService.getById(quizId);

  if (user.subscribedQuizzes.includes(quizId)) {
    update = { $pull: innerContent };
    increment = -1;

    if (quiz.isScheduled) {
      await notificationService.unsubscribe(userId, quizId);
    }
  } else {
    update = { $push: innerContent };
    increment = 1;

    if (quiz.isScheduled) {
      await notificationService.create({
        recipient: userId,
        quiz: quizId,
        type: 'startingOfScheduledQuiz',
        validFrom: quiz.startTime,
        validTill: new Date(
          new Date(quiz.startTime).getTime() + quiz.duration * 60000
        ),
        link: `/quiz/${quizId}/play`,
        text: `Scheduled quiz '${quiz.name}' has started`,
      });
    }
  }

  await userService.update(userId, update);
  await quizService.update(quizId, {
    $inc: { totalSubscribers: increment },
  });

  res.status(httpStatus.NO_CONTENT).send();
});

const getUpcomingSubscribedQuizzes = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id, 'subscribedQuizzes');

  let results = user.subscribedQuizzes
    .filter(
      quiz =>
        quiz.isScheduled && new Date(quiz.startTime).getTime() >= Date.now()
    )
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

  res.status(httpStatus.OK).send(results);
});

const getSubscribedQuizzes = catchAsync(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const user = await userService.getUserById(req.user.id, {
    path: 'subscribedQuizzes',
    populate: 'categories',
  });

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
  getUpcomingSubscribedQuizzes,
};
