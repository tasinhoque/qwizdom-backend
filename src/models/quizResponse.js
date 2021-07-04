const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const quizResponseSchema = Schema(
  {
    responder: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    quiz: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'quiz',
    },
    totalPoints: Number,
    stageResponses: [
      {
        stage: {
          type: SchemaTypes.ObjectId,
          ref: 'Stage',
        },
        responses: [
          {
            type: SchemaTypes.ObjectId,
            ref: 'question-response',
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

quizResponseSchema.plugin(toJSON);

const QuizResponse = model('quiz-response', quizResponseSchema);

module.exports = QuizResponse;
