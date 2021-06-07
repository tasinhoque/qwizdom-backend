const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const reviewSchema = Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    quiz: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'Quiz',
    },
    rating: Number,
    text: String,
  },
  { timestamps: true }
);

reviewSchema.plugin(toJSON);

const Review = model('Review', reviewSchema);

module.exports = Review;
