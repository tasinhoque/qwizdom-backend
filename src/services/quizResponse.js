const { QuizResponse } = require('../models');

const create = async (body) => QuizResponse.create(body);

const update = async (id, updateBody) => QuizResponse.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const getByUser = async (userId) => QuizResponse.find({ user: userId });

module.exports = {
  create,
  update,
  getByUser,
};
