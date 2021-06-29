const { Stage } = require('../models');

const create = async body => Stage.create(body);

const update = async (id, updateBody) => {
  const stage = await Stage.findByIdAndUpdate(id, updateBody, {
    new: true,
  }).orFail();
  return stage;
};

const getByQuiz = async quizId => Stage.find({ quiz: quizId }).sort('serial');

const deleteByQuiz = async quizId => Stage.deleteMany({ quiz: quizId });

module.exports = {
  create,
  update,
  getByQuiz,
  deleteByQuiz,
};
