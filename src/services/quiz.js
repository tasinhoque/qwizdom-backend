const { Quiz } = require('../models');

const create = async (body) => {
  const quiz = await Quiz.create(body);
  return quiz;
};

const update = async (quizId, updateBody) => {
  const quiz = await Quiz.findByIdAndUpdate(quizId, updateBody, { new: true }).orFail();
  return quiz;
};

module.exports = {
  create,
  update,
};
