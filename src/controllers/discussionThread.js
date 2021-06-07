const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { discussionThreadService } = require('../services');

const create = catchAsync(async (req, res) => {
  const response = await discussionThreadService.create(req.body);
  res.status(httpStatus.CREATED).send(response);
});

module.exports = {
  create,
};
