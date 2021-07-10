const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { reviewService, quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const data = { user: req.user.id, ...req.body };
  const review = await reviewService.create(data);

  await quizService.update(req.params.quizId, {
    $push: { reviews: review.id },
  });

  res.status(httpStatus.CREATED).send(review);
});

const getAverageRating = catchAsync(async (req, res) => {
  const response = await reviewService.getAverageRating(req.params.quizId);
  res.status(httpStatus.OK).send({ averageRating: response[0].averageRating });
});

module.exports = {
  create,
  getAverageRating,
};
