const { Quiz } = require('../models');

const create = async body => Quiz.create(body);

const update = async (id, updateBody) =>
  Quiz.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const get = async (filters, options) => Quiz.paginate(filters, options);

const getByCreator = async (userId, filter) =>
  Quiz.paginate({ ...filter, creator: userId }, {});

const getPreviews = async (filters, options) => Quiz.paginate(filters, options);

const getById = async id => Quiz.findById(id).populate('creator').orFail();

module.exports = {
  create,
  update,
  get,
  getByCreator,
  getPreviews,
  getById,
};
