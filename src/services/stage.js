const { Stage } = require('../models');

const create = async (body) => Stage.create(body);

const update = async (id, updateBody) => {
  const stage = await Stage.findByIdAndUpdate(id, updateBody, { new: true }).orFail();
  return stage;
};

module.exports = {
  create,
  update,
};
