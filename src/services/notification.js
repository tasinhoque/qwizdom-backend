const { Notification } = require('../models');

const create = async data => Notification.create(data);

const remove = async (id, body) => Notification.findByIdAndRemove(id).orFail();

const update = async (id, body) =>
  Notification.findByIdAndUpdate(id, body).orFail();

const getForUser = async userId =>
  Notification.find({
    recipient: userId,
    validFrom: { $lte: new Date() },
    validTill: { $gt: new Date() },
  }).sort('-createdAt');

const getUnreadCount = async userId =>
  Notification.countDocuments({
    recipient: userId,
    isRead: false,
    validFrom: { $lte: new Date() },
    validTill: { $gt: new Date() },
  });

const getPending = async (userId, quizId) =>
  Notification.findOne({
    recipient: userId,
    quiz: quizId,
    type: 'pendingSubmission',
  });

const unsubscribe = async (userId, quizId) =>
  Notification.deleteOne({
    recipient: userId,
    quiz: quizId,
    type: 'startingOfScheduledQuiz',
  });

module.exports = {
  create,
  getForUser,
  update,
  getUnreadCount,
  unsubscribe,
  getPending,
  remove,
};
