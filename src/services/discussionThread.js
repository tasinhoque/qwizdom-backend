const { DiscussionThread } = require('../models');

const create = async (body) => DiscussionThread.create(body);
const update = async (id, updateBody) => DiscussionThread.findByIdAndUpdate(id, updateBody, { new: true }).orFail();
const get = async (id, populate = '') => DiscussionThread.findById(id).populate(populate).orFail();

module.exports = {
  create,
  update,
  get,
};
