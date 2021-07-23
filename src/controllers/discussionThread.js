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
  const discussionThread = await discussionThreadService.getById(
    req.params.discussionThreadId
  );
  res.status(httpStatus.OK).send(discussionThread);
});

const flipVote = async (req, res, type) => {
  const { discussionThreadId } = req.params;
  const userId = req.user.id;
  const discussionThread = await discussionThreadService.getById(
    discussionThreadId
  );

  let update = {};
  let innerContent;
  let votes;

  if (type === 'up') {
    innerContent = { upvotes: req.user.id };
    votes = discussionThread.upvotes;
  } else {
    innerContent = { downvotes: req.user.id };
    votes = discussionThread.downvotes;
  }

  if (votes.includes(userId)) {
    update = { $pull: innerContent };
  } else {
    update = { $push: innerContent };
  }
  await discussionThreadService.update(discussionThreadId, update);

  res.status(httpStatus.NO_CONTENT).send();
};

const flipUpvote = catchAsync(async (req, res) => flipVote(req, res, 'up'));
const flipDownvote = catchAsync(async (req, res) => flipVote(req, res, 'down'));

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
  update,
  remove,
  flipUpvote,
  flipDownvote,
};
