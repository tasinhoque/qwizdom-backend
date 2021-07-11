const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const reviewSchema = Schema(
  {
    quiz: {
      type: SchemaTypes.ObjectId,
      ref: 'quiz',
    },
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'user',
    },
    rating: Number,
    text: String,
  },
  { timestamps: true }
);

reviewSchema.plugin(toJSON);
reviewSchema.plugin(paginate);

const Review = model('review', reviewSchema);

module.exports = Review;
