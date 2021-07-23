const { Notification } = require('../models');

const create = async data => Notification.create(data);

const update = async (id, body) =>
  Notification.findByIdAndUpdate(id, body).orFail();

const getForUser = async userId =>
  Notification.find({ recipient: userId }).sort('-createdAt');

const getUnreadCount = async userId =>
  Notification.countDocuments({ recipient: userId, isRead: false });

module.exports = { create, getForUser, update, getUnreadCount };
