const { Question } = require('../models');

const create = async (body) => {
  const question = await Question.create(body);
  return question;
};

const update = async (questionId, updateBody) => {
  const question = await Question.findByIdAndUpdate(questionId, updateBody, { new: true });
  return question;
};

module.exports = {
  create,
  update,
};
