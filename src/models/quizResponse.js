const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const quizResponseSchema = Schema(
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

quizResponseSchema.plugin(toJSON);

const QuizResponse = model('QuizResponse', quizResponseSchema);

module.exports = QuizResponse;
