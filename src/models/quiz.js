const { Schema, model, SchemaTypes } = require('mongoose');

const schema = Schema(
  {
    name: String,
    startTime: Date,
    duration: Number,
    isPublished: Boolean,
    isTest: Boolean,
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
    hasAutoEvaluation: Boolean,
    description: String,
    coverImage: String,
    totalMarks: Number,
  },
  { timestamps: true }
);

const Quiz = model('Quiz', schema);

module.exports = Quiz;
