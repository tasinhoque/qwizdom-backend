const { Question } = require('../models');

const create = async (body) => Question.create(body);

const update = async (id, updateBody) => Question.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
