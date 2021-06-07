const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const user = await quizService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const update = catchAsync(async (req, res) => {
  const user = await quizService.update(req.params.quizId, req.body);
  res.status(httpStatus.OK).send(user);
});

module.exports = {
  create,
  update,
};
