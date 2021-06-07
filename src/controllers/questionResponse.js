const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { questionResponseService } = require('../services');

const create = catchAsync(async (req, res) => {
  const body = {
    ...req.body,
    question: req.params.questionId,
    user: req.params.userId,
  };

  const question = await questionResponseService.create(body);
  res.status(httpStatus.CREATED).send(question);
});

module.exports = {
  create,
};
