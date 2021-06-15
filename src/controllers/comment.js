const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { commentService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    user: req.params.userId,
    discussionThread: req.params.discussionThreadId,
  };

  const comment = await commentService.create(body);
  res.status(httpStatus.CREATED).send(comment);
});

module.exports = {
  create,
};
