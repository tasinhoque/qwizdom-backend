const { Quiz } = require('../models');

const create = async (body) => {
  const quiz = await Quiz.create(body);
  return quiz;
};

const update = async (quizId, body) => {
  const quiz = await Quiz.findByIdAndUpdate(quizId, body, { new: true });
  return quiz;
};

const addStage = async (quizId, stageId) => {
  await Quiz.findByIdAndUpdate(quizId, { $push: { stages: stageId } });
};

module.exports = {
  create,
  addStage,
  update,
};
