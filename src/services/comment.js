const { Comment } = require('../models');

const create = async (body) => Comment.create(body);

const update = async (commentId, updateBody) => Comment.findByIdAndUpdate(commentId, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
