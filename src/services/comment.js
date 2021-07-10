const { Comment } = require('../models');

const create = async body => Comment.create(body);

const getByDiscussionThread = async discussionThread =>
  Comment.find({ discussionThread });

const update = async (id, updateBody) =>
  Comment.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
  getByDiscussionThread,
};
