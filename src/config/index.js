const config = require('./config');
const morgan = require('./morgan');
const logger = require('./logger');
const { jwtStrategy } = require('./passport');
const { roles, roleRights } = require('./roles');
const { tokenTypes } = require('./tokens');

module.exports = {
  config,
  morgan,
  logger,
  jwtStrategy,
  roleRights,
  roles,
  tokenTypes,
};
