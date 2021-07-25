const { Quiz } = require('../models');

const create = async body => Quiz.create(body);

const update = async (id, updateBody) =>
  Quiz.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const get = async (filters, options) => Quiz.paginate(filters, options);

const getByCreatorForTaskPage = async userId =>
  Quiz.find({ creator: userId, hasAutoEvaluation: false });

const getByCreator = async (userId, filter) =>
  Quiz.paginate({ ...filter, creator: userId }, { populate: 'categories' });

const getPreviews = async (filters, options) => Quiz.paginate(filters, options);

const remove = async id => Quiz.findByIdAndDelete(id).orFail();

const getById = async id =>
  Quiz.findById(id).populate('creator categories').orFail();

module.exports = {
  create,
  update,
  get,
  getByCreator,
  getByCreatorForTaskPage,
  getPreviews,
  getById,
  remove,
};
