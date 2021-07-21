const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { discussionThreadService, commentService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    user: req.user.id,
    quiz: req.params.quizId,
  };

  const discussionThread = await discussionThreadService.create(body);
  res.status(httpStatus.CREATED).send(discussionThread);
});

const get = catchAsync(async (req, res) => {
  const discussionThread = await discussionThreadService.get(
    req.params.discussionThreadId
  );
  res.status(httpStatus.OK).send(discussionThread);
});

const like = catchAsync(async (req, res) => {
  await discussionThreadService.update(req.params.discussionThreadId, {
    $push: { likes: req.user.id },
  });
  res.status(httpStatus.NO_CONTENT).send();
});

const unlike = catchAsync(async (req, res) => {
  await discussionThreadService.update(req.params.discussionThreadId, {
    $pull: { likes: req.user.id },
  });
  res.status(httpStatus.NO_CONTENT).send();
});

const update = catchAsync(async (req, res) => {
  const response = await discussionThreadService.update(
    req.params.discussionThreadId,
    req.body
  );
  res.status(httpStatus.OK).send(response);
});

const remove = catchAsync(async (req, res) => {
  const { discussionThreadId } = req.params;

  await discussionThreadService.remove(discussionThreadId);
  await commentService.removeByThread(discussionThreadId);

  res.status(httpStatus.NO_CONTENT).send();
});

const getByQuiz = catchAsync(async (req, res) => {
  const { page, limit } = req.query;

  const queryResult = await discussionThreadService.getByQuiz(
    req.params.quizId,
    page,
    limit
  );
  res.status(httpStatus.OK).send(queryResult);
});

module.exports = {
  create,
  get,
  getByQuiz,
  like,
  unlike,
  update,
  remove,
};
