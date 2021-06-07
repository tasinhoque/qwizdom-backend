const { Stage } = require('../models');

const create = async (body) => {
  const stage = await Stage.create(body);
  return stage;
};

const update = async (stageId, updateBody) => {
  const stage = await Stage.findByIdAndUpdate(stageId, updateBody, { new: true }).orFail();
  return stage;
};

module.exports = {
  create,
  update,
};
