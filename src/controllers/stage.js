const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { stageService, quizService, questionService } = require('../services');

const create = catchAsync(async (req, res) => {
  const stage = await stageService.create(req.body);
  await quizService.update(req.params.quizId, { $push: { stages: stage.id } });
  res.status(httpStatus.CREATED).send(stage);
});

const remove = catchAsync(async (req, res) => {
  const { stageId } = req.params;

  await stageService.remove(stageId);
  await questionService.deleteByStage(stageId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  create,
  remove,
};
