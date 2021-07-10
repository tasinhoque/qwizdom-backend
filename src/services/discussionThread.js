const { DiscussionThread } = require('../models');

const create = async body => DiscussionThread.create(body);

const update = async (id, updateBody) =>
  DiscussionThread.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const get = async id => DiscussionThread.findById(id).orFail();

const getByQuiz = async (quizId, page, limit) =>
  DiscussionThread.paginate({ quiz: quizId }, { page, limit });

module.exports = {
  create,
  update,
  get,
  getByQuiz,
};
