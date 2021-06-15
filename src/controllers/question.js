const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { questionService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    stage: req.params.stageId,
  };

  const question = await questionService.create(body);
  res.status(httpStatus.CREATED).send(question);
});

module.exports = {
  create,
};
