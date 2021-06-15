const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { discussionThreadService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    quiz: req.params.quizId,
  };

  const discussionThread = await discussionThreadService.create(body);
  res.status(httpStatus.CREATED).send(discussionThread);
});

const getAllComments = catchAsync(async (req, res) => {
  const discussionThread = await discussionThreadService.get(req.params.discussionThreadId, 'comments');
  res.status(httpStatus.OK).send(discussionThread.comments);
});

const get = catchAsync(async (req, res) => {
  const discussionThread = await discussionThreadService.get(req.params.discussionThreadId);
  res.status(httpStatus.OK).send(discussionThread);
});

module.exports = {
  create,
  getAllComments,
  get,
};
