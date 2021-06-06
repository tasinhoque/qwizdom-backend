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

module.exports.quizExample = {
  user: 'lskdfjlskj043850',
  text: 'something',
  name: 'something',
  startTime: '21-4-34' || new Date('dlfjslj').toString(),
  duration: 50,
  isPublished: false,
  isTest: false,
  categories: ['dslfjslk08432509'],
  stages: ['sldjflsk3400', 'dslkjflks043850'],
  discussionThreads: [],
  hasAutoEvaluation: false,
  description: 'A random description',
  coverImage: 'www.avatar.ui/50',
};
