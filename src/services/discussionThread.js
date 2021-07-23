const { DiscussionThread } = require('../models');

const create = async body => DiscussionThread.create(body);

const update = async (id, updateBody) =>
  DiscussionThread.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const remove = async id => DiscussionThread.findByIdAndRemove(id).orFail();

const getById = async id =>
  DiscussionThread.findById(id).populate('user').orFail();

const getByQuiz = async (quizId, page, limit) =>
  DiscussionThread.paginate(
    { quiz: quizId },
    { page, limit, populate: 'user', sortBy: '-createdAt' }
  );

module.exports = {
  create,
  update,
  getById,
  getByQuiz,
  remove,
};
