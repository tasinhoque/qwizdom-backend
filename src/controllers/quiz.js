const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const user = await quizService.create(req.body);
  res.status(httpStatus.CREATED).send(user);
});

module.exports = {
  create,
};
