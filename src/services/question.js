const { Question } = require('../models');

const create = async body => Question.create(body);

const update = async (id, updateBody) =>
  Question.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const getByStage = async stageId =>
  Question.find({ stage: stageId }).sort('serial');

const deleteByStage = async stageId => Question.deleteMany({ stage: stageId });

module.exports = {
  create,
  update,
  getByStage,
  deleteByStage,
};
