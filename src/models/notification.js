const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    link: String,
    text: String,
  },
  { timestamps: true }
);

const Notification = model('Notification', schema);

module.exports = Notification;
