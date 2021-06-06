const { Quiz } = require('../models');

const create = async (body) => {
  const user = await Quiz.create(body);
  return user;
};

module.exports = {
  create,
};
