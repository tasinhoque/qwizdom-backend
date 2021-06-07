const { DiscussionThread } = require('../models');

const create = async (body) => {
  const discussionThread = await DiscussionThread.create(body);
  return discussionThread;
};

const update = async (discussionThreadId, updateBody) => {
  const discussionThread = await DiscussionThread.findByIdAndUpdate(discussionThreadId, updateBody, { new: true }).orFail();
  return discussionThread;
};

module.exports = {
  create,
  update,
};
