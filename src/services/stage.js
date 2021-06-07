const { Stage } = require('../models');

const create = async (body) => {
  const stage = await Stage.create(body);
  return stage;
};

const update = async (stageId, body) => {
  const stage = await Stage.findByIdAndUpdate(stageId, body, { new: true });
  return stage;
};

module.exports = {
  create,
  update,
};
