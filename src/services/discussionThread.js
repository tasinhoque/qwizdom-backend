const { DiscussionThread } = require('../models');

const create = async (body) => DiscussionThread.create(body);

const update = async (discussionThreadId, updateBody) =>
  DiscussionThread.findByIdAndUpdate(discussionThreadId, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
