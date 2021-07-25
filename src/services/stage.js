const { Stage } = require('../models');

const create = async body => Stage.create(body);

const update = async (id, updateBody) =>
  Stage.findByIdAndUpdate(id, updateBody, {
    new: true,
  });

const getByQuiz = async quizId => Stage.find({ quiz: quizId }).sort('serial');

const deleteByQuiz = async quizId => Stage.deleteMany({ quiz: quizId });

const remove = async id => Stage.findByIdAndDelete(id).orFail();

module.exports = {
  create,
  update,
  getByQuiz,
  deleteByQuiz,
  remove,
};
