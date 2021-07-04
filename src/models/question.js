const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const questionSchema = Schema(
  {
    stage: {
      type: SchemaTypes.ObjectId,
      ref: 'stage',
    },
    serial: Number,
    points: Number,
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
      enum: [
        'mcq',
        'checkbox',
        'fileUpload',
        'text',
        'fillInTheGaps',
        'trueOrFalse',
      ],
    },
  },
  { timestamps: true }
);

questionSchema.plugin(toJSON);

const Question = model('question', questionSchema);

module.exports = Question;
