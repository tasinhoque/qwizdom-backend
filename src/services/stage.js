const { Stage } = require('../models');

const create = async (body) => {
  const user = await Stage.create(body);
  return user;
};

module.exports = {
  create,
};
