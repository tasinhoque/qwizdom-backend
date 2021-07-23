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
    quiz: {
      type: SchemaTypes.ObjectId,
      ref: 'quizzes',
    },
    type: {
      type: String,
      enum: [
        'publicationOfResult',
        'pendingSubmission',
        'startingOfScheduledQuiz',
      ],
    },
    validFrom: {
      type: Date,
      default: new Date(),
    },
    validTill: {
      type: Date,
      default: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
    },
    participants: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'user',
      },
    ],
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
