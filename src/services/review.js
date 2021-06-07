const { Review } = require('../models');

const create = async (body) => Review.create(body);

const update = async (id, updateBody) => {
  const review = await Review.findByIdAndUpdate(id, updateBody, { new: true }).orFail();
  return review;
};

module.exports = {
  create,
  update,
};
