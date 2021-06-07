const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { reviewService } = require('../services');

const create = catchAsync(async (req, res) => {
  const response = await reviewService.create(req.body);
  res.status(httpStatus.CREATED).send(response);
});

module.exports = {
  create,
};
