const { Category } = require('../models');

const create = async (body) => Category.create(body);

const get = async () => Category.find();

const update = async (id, updateBody) => Category.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

module.exports = {
  create,
  get,
  update,
};
