const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const questionResponseSchema = Schema(
  {
    responder: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    question: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'question',
    },
    text: String,
    options: [Boolean],
    file: String,
    points: Number,
  },
  { timestamps: true }
);

questionResponseSchema.plugin(toJSON);

const QuestionResponse = model('question-response', questionResponseSchema);

module.exports = QuestionResponse;
