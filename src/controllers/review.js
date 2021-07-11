const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { reviewService, quizService } = require('../services');

const create = catchAsync(async (req, res) => {
  const data = { user: req.user.id, quiz: req.params.quizId, ...req.body };
  const review = await reviewService.create(data);
  const [element, ..._rest] = await reviewService.getAverageRating(
    req.params.quizId
  );

  await quizService.update(req.params.quizId, {
    averageRating: element.averageRating,
  });
  res.status(httpStatus.CREATED).send(review);
});

const getAverageRating = catchAsync(async (req, res) => {
  const [element, ..._rest] = await reviewService.getAverageRating(
    req.params.quizId
  );

  res.status(httpStatus.OK).send({ averageRating: element.averageRating });
});

const getByQuiz = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const response = await reviewService.getByQuiz(
    req.params.quizId,
    page,
    limit
  );
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  create,
  getAverageRating,
  getByQuiz,
};
