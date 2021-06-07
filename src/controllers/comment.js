const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { commentService, discussionThreadService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    user: req.params.userId,
  };

  const comment = await commentService.create(body);
  await discussionThreadService.update(req.params.discussionThreadId, { $push: { comments: comment.id } });
  res.status(httpStatus.CREATED).send(comment);
});

module.exports = {
  create,
};
