const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { notificationService } = require('../services');

const getForUser = catchAsync(async (req, res) => {
  const response = await notificationService.getForUser(req.user.id);
  res.status(httpStatus.OK).send(response);
});

const getUnread = catchAsync(async (req, res) => {
  const response = await notificationService.getUnreadCount(req.user.id);
  res.status(httpStatus.OK).send({ count: response });
});

const markAsRead = catchAsync(async (req, res) => {
  await notificationService.update(req.params.notificationId, { isRead: true });
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = { getForUser, markAsRead, getUnread };
