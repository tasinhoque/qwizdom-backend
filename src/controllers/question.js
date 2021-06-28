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

const uploadImage = catchAsync(async (req, res) => {
  const question = await questionService.update(req.params.questionId, { image: res.locals.publicUrl });
  res.status(httpStatus.OK).send(question);
});

module.exports = {
  create,
  uploadImage,
};
