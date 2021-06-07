const { Schema, model } = require('mongoose');
const { toJSON } = require('./plugins');

const notificationSchema = Schema(
  {
    link: String,
    text: String,
  },
  { timestamps: true }
);

notificationSchema.plugin(toJSON);

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
