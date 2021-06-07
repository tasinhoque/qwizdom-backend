const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { reviewService, quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const review = await reviewService.create(req.body);
  await quizService.update(req.params.quizId, { $push: { stages: review.id } });
  res.status(httpStatus.CREATED).send(review);
});

module.exports = {
  create,
};
