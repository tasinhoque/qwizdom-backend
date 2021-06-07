const { QuizResponse } = require('../models');

const create = async (body) => QuizResponse.create(body);

const update = async (quizResponseId, updateBody) =>
  QuizResponse.findByIdAndUpdate(quizResponseId, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
