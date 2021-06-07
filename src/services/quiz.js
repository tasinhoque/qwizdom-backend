const { Quiz } = require('../models');

const create = async (body) => Quiz.create(body);

const update = async (id, updateBody) => Quiz.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
