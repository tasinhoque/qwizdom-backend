const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    question: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'Question',
    },
    text: String,
    options: [Number],
    file: String,
    marks: Number,
  },
  { timestamps: true }
);

schema.plugin(toJSON);

const QuestionerResponse = model('QuestionerResponse', schema);

module.exports = QuestionerResponse;
