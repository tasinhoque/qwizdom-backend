const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

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

schema.plugin(toJSON);

const Questioner = model('Questioner', schema);

module.exports = Questioner;
