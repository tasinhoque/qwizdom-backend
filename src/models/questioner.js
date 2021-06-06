const { Schema, model, SchemaTypes } = require('mongoose');

const schema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    quizzes: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Quiz',
      },
    ],
  },
  { timestamps: true }
);

const Questioner = model('Questioner', schema);

module.exports = Questioner;
