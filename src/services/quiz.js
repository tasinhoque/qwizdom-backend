const { Quiz } = require('../models');

const create = async (body) => Quiz.create(body);

const update = async (id, updateBody) => Quiz.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const get = async (filters, options) => Quiz.paginate(filters, options);

// const getPreviews = async (filters, options) => Quiz.paginate(filters, options);

module.exports = {
  create,
  update,
  get,
};
