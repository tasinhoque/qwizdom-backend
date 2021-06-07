const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const response = await quizService.create(req.body);
  res.status(httpStatus.CREATED).send(response);
});

const update = catchAsync(async (req, res) => {
  const response = await quizService.update(req.params.quizId, req.body);
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  create,
  update,
};
