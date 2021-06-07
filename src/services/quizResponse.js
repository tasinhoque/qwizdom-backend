const { QuizResponse } = require('../models');

const create = async (body) => QuizResponse.create(body);

const update = async (id, updateBody) => QuizResponse.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
