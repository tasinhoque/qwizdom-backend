const { DiscussionThread } = require('../models');

const create = async (body) => {
  const discussionThread = await DiscussionThread.create(body);
  return discussionThread;
};

const update = async (discussionThreadId, body) => {
  const discussionThread = await DiscussionThread.findByIdAndUpdate(discussionThreadId, body, { new: true });
  return discussionThread;
};

module.exports = {
  create,
  update,
};
