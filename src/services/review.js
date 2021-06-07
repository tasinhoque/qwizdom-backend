const { Review } = require('../models');

const create = async (body) => {
  const response = await Review.create(body);
  return response;
};

const update = async (reviewId, body) => {
  const response = await Review.findByIdAndUpdate(reviewId, body, { new: true });
  return response;
};

module.exports = {
  create,
  update,
};
