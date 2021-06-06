const { Schema, model } = require('mongoose');

const schema = Schema(
  {
    serial: Number,
    totalMarks: Number,
    difficulty: Number,
    title: String,
    image: String,
    options: [
      {
        isAnswer: Boolean,
        text: String,
        image: String,
      },
    ],
    answer: String,
    isObjective: Boolean,
    canUploadFile: Boolean,
    type: {
      type: String,
      enum: ['mcq', 'checkbox', 'fileUpload', 'text', 'fillInTheGaps', 'trueOrFalse'],
    },
  },
  { timestamps: true }
);

const Question = model('Question', schema);

module.exports = Question;
