const { Schema, model, SchemaTypes } = require('mongoose');
const { toJSON } = require('./plugins');

const schema = Schema(
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

schema.plugin(toJSON);

const Review = model('Review', schema);

module.exports = Review;
