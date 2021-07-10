const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const quizSchema = Schema(
  {
    creator: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    name: String,
    startTime: Date,
    endTime: Date,
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
        ref: 'category',
      },
    ],
    hasAutoEvaluation: {
      type: Boolean,
      default: false,
    },
    averageRating: Number,
    totalParticipants: Number,
    totalSubscribers: Number,
    description: String,
    coverImage: String,
    totalPoints: Number,
  },
  { timestamps: true }
);

quizSchema.plugin(toJSON);
quizSchema.plugin(paginate);

const Quiz = model('quiz', quizSchema);

module.exports = Quiz;
