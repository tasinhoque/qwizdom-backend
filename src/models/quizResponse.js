const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    quiz: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'Quiz',
    },
    stages: [
      {
        stage: {
          type: SchemaTypes.ObjectId,
          ref: 'Stage',
        },
        responses: [
          {
            type: SchemaTypes.ObjectId,
            ref: 'QuestionResponse',
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const QuizResponse = model('QuizResponse', schema);

module.exports = QuizResponse;
