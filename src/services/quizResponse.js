const { QuizResponse } = require('../models');

const create = async (body) => {
  const quizResponse = await QuizResponse.create(body);
  return quizResponse;
};

const update = async (quizResponseId, updateBody) => {
  const quizResponse = await QuizResponse.findByIdAndUpdate(quizResponseId, updateBody, { new: true });
  return quizResponse;
};

module.exports = {
  create,
  update,
};
