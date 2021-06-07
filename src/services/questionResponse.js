const { QuestionResponse } = require('../models');

const create = async (body) => {
  const questionResponse = await QuestionResponse.create(body);
  return questionResponse;
};

const update = async (questionResponseId, updateBody) => {
  const questionResponse = await QuestionResponse.findByIdAndUpdate(questionResponseId, updateBody, { new: true }).orFail();
  return questionResponse;
};

module.exports = {
  create,
  update,
};
