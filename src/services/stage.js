const { Stage } = require('../models');

const create = async (body) => Stage.create(body);

const update = async (stageId, updateBody) => {
  const stage = await Stage.findByIdAndUpdate(stageId, updateBody, { new: true }).orFail();
  return stage;
};

module.exports = {
  create,
  update,
};
