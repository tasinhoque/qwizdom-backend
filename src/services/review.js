const { Review } = require('../models');

const create = async (body) => Review.create(body);

const update = async (reviewId, updateBody) => {
  const review = await Review.findByIdAndUpdate(reviewId, updateBody, { new: true }).orFail();
  return review;
};

module.exports = {
  create,
  update,
};
