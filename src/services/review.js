const { Review } = require('../models');

const create = async (body) => {
  const review = await Review.create(body);
  return review;
};

const update = async (reviewId, body) => {
  const review = await Review.findByIdAndUpdate(reviewId, body, { new: true });
  return review;
};

module.exports = {
  create,
  update,
};
