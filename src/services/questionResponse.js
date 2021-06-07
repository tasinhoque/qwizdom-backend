const { QuestionResponse } = require('../models');

const create = async (body) => QuestionResponse.create(body);

const update = async (questionResponseId, updateBody) =>
  QuestionResponse.findByIdAndUpdate(questionResponseId, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
