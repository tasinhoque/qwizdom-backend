const { Comment } = require('../models');

const create = async (body) => {
  const comment = await Comment.create(body);
  return comment;
};

const update = async (commentId, updateBody) => {
  const comment = await Comment.findByIdAndUpdate(commentId, updateBody, { new: true }).orFail();
  return comment;
};

module.exports = {
  create,
  update,
};
