const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    finishedQuizzes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'QuizResponse',
      },
    ],
    subscribedQuizzes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Quiz',
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const Participant = model('Participant', schema);

module.exports = Participant;
