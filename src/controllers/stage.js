const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { stageService, quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const stage = await stageService.create(req.body);
  await quizService.addStage(req.params.quizId, stage.id);
  res.status(httpStatus.CREATED).send(stage);
});

module.exports = {
  create,
};
