const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  create,
};
