const { Schema, model, SchemaTypes } = require('mongoose');

const schema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    text: String,
  },
  { timestamps: true }
);

const Question = model('Question', schema);

module.exports = Question;
