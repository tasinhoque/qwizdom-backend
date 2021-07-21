const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { commentService, discussionThreadService } = require('../services');

const create = catchAsync(async (req, res) => {
  const { discussionThreadId } = req.params;

  const body = {
    ...req.body,
    user: req.user.id,
    discussionThread: req.params.discussionThreadId,
  };

  await discussionThreadService.update(discussionThreadId, {
    $inc: { totalComments: 1 },
  });

  const comment = await commentService.create(body);
  res.status(httpStatus.CREATED).send(comment);
});

const getByDiscussionThread = catchAsync(async (req, res) => {
  const comments = await commentService.getByDiscussionThread(
    req.params.discussionThreadId
  );
  res.status(httpStatus.OK).send(comments);
});

const update = catchAsync(async (req, res) => {
  const response = await commentService.update(req.params.commentId, req.body);
  res.status(httpStatus.OK).send(response);
});

const remove = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const response = await commentService.remove(commentId);

  await discussionThreadService.update(response.discussionThread, {
    $inc: { totalComments: -1 },
  });

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  getByDiscussionThread,
  update,
  remove,
};
