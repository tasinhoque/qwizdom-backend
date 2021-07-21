const { Notification } = require('../models');

const getForUser = async userId => Notification.find({ recipient: userId });

module.exports = { getForUser };
