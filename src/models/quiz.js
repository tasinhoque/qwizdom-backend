const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const quizSchema = Schema(
  {
    name: String,
    startTime: Date,
    duration: Number,
    isPublished: {
      type: Boolean,
      default: false,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
    categories: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Category',
      },
    ],
    stages: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Stage',
      },
    ],
    discussionThreads: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'DiscussionThread',
      },
    ],
    reviews: [
      {
        type: SchemaTypes.ObjectId,
        ref: 'Reviews',
      },
    ],
    hasAutoEvaluation: {
      type: Boolean,
      default: false,
    },
    description: String,
    coverImage: String,
    totalMarks: Number,
  },
  { timestamps: true }
);

quizSchema.plugin(toJSON);

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
