const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { questionService, stageService } = require('../services');

const create = catchAsync(async (req, res) => {
  const question = await questionService.create(req.body);
  await stageService.update(req.params.stageId, { $push: { questions: question.id } });
  res.status(httpStatus.CREATED).send(question);
});

module.exports = {
  create,
};
