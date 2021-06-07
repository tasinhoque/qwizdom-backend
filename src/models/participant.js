const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const participantSchema = Schema(
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

participantSchema.plugin(toJSON);

const Participant = model('Participant', participantSchema);

module.exports = Participant;
