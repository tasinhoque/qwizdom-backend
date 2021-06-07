const { Schema, model } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    link: String,
    text: String,
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const Notification = model('Notification', schema);

module.exports = Notification;
