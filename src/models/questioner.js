const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const questionerSchema = Schema(
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

questionerSchema.plugin(toJSON);

const Questioner = model('Questioner', questionerSchema);

module.exports = Questioner;
