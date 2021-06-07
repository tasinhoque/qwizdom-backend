const { Quiz } = require('../models');

const create = async (body) => Quiz.create(body);

const update = async (quizId, updateBody) => Quiz.findByIdAndUpdate(quizId, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
