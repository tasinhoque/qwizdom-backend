const { version } = require('../../package.json');
const { config } = require('../config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Qwizdom API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/tasinhoque/qwizdom-backend',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
