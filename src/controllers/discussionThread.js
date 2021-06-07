const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { discussionThreadService, quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const discussionThread = await discussionThreadService.create(req.body);
  await quizService.update(req.params.quizId, { $push: { discussionThreads: discussionThread.id } });
  res.status(httpStatus.CREATED).send(discussionThread);
});

module.exports = {
  create,
};
