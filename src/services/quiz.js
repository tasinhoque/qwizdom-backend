const { Quiz } = require('../models');

const create = async (body) => {
  const response = await Quiz.create(body);
  return response;
};

const update = async (quizId, body) => {
  const response = await Quiz.findByIdAndUpdate(quizId, body, { new: true });
  return response;
};

const addStage = async (quizId, stageId) => {
  await Quiz.findByIdAndUpdate(quizId, { $push: { stages: stageId } });
};

module.exports = {
  create,
  addStage,
  update,
};
