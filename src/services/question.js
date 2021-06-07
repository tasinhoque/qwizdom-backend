const { Question } = require('../models');

const create = async (body) => Question.create(body);

const update = async (questionId, updateBody) => Question.findByIdAndUpdate(questionId, updateBody, { new: true }).orFail();

module.exports = {
  create,
  update,
};
