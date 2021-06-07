const { QuestionResponse } = require('../models');

const create = async (body) => QuestionResponse.create(body);

const update = async (id, updateBody) => QuestionResponse.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
