const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { commentService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    user: req.user.id,
    discussionThread: req.params.discussionThreadId,
  };

  const comment = await commentService.create(body);
  res.status(httpStatus.CREATED).send(comment);
});

const getByDiscussionThread = catchAsync(async (req, res) => {
  const comments = await commentService.getByDiscussionThread(
    req.params.discussionThreadId
  );
  res.status(httpStatus.OK).send(comments);
});

module.exports = {
  create,
  getByDiscussionThread,
};
