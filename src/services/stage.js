const { Stage } = require('../models');

const create = async (body) => {
  const response = await Stage.create(body);
  return response;
};

module.exports = {
  create,
};
