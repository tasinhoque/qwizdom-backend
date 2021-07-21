const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const notificationSchema = Schema(
  {
    recipient: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    link: String,
    text: String,
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

notificationSchema.plugin(toJSON);

const Notification = model('notification', notificationSchema);

module.exports = Notification;
