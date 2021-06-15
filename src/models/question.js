const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const questionSchema = Schema(
  {
    stage: {
      type: SchemaTypes.ObjectId,
      ref: 'Stage',
    },
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

questionSchema.plugin(toJSON);

const Question = model('Question', questionSchema);

module.exports = Question;
