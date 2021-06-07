const { DiscussionThread } = require('../models');

const create = async (body) => {
  const response = await DiscussionThread.create(body);
  return response;
};

const update = async (discussionThreadId, body) => {
  const response = await DiscussionThread.findByIdAndUpdate(discussionThreadId, body, { new: true });
  return response;
};

module.exports = {
  create,
  update,
};
