const { Review } = require('../models');
const { Types } = require('mongoose');

const create = async body => Review.create(body);

const getByQuiz = async (quizId, page, limit) =>
  Review.paginate({ quiz: quizId }, { page, limit, populate: 'user' });

const update = async (id, updateBody) => {
  const review = await Review.findByIdAndUpdate(id, updateBody, {
    new: true,
  }).orFail();
  return review;
};

const getAverageRating = async quizId =>
  Review.aggregate([
    {
      $match: {
        $expr: { $eq: ['$quiz', Types.ObjectId(quizId)] },
      },
    },
    {
      $group: {
        _id: '$quiz',
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

module.exports = {
  create,
  update,
  getAverageRating,
  getByQuiz,
};
