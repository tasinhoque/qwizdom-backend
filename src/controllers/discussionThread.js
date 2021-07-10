const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { discussionThreadService } = require('../services');

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
};
