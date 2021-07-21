const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { notificationService } = require('../services');

const getForUser = catchAsync(async (req, res) => {
  const response = await notificationService.getForUser(req.user.id);
  res.status(httpStatus.OK).send(response);
});

module.exports = { getForUser };
