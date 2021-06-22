const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { categoryService } = require('../services');

const create = catchAsync(async (req, res) => {
  const comment = await categoryService.create(req.body);
  res.status(httpStatus.CREATED).send(comment);
});

const get = catchAsync(async (_req, res) => {
  const categories = await categoryService.get();
  res.status(httpStatus.CREATED).send(categories);
});

module.exports = {
  create,
  get,
};
