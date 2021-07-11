const { Types } = require('mongoose');
const { QuizResponse } = require('../models');

const create = async body => QuizResponse.create(body);

const update = async (id, updateBody) =>
  QuizResponse.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const getByUser = async userId =>
  QuizResponse.find({ responder: userId }).populate('quiz');

const getByQuizAndUser = async (quizId, userId) =>
  QuizResponse.find({ responder: userId, quiz: quizId })
    .populate({
      path: 'stageResponses quiz',
      populate: { path: 'responses categories creator', populate: 'question' },
    })
    .sort('-createdAt');

const getParticipantCount = async quizId =>
  QuizResponse.aggregate([
    {
      $match: {
        $expr: { $eq: ['$quiz', Types.ObjectId(quizId)] },
      },
    },
    {
      $group: {
        _id: '$responder',
      },
    },
    {
      $count: 'totalParticipants',
    },
  ]);

module.exports = {
  create,
  update,
  getByUser,
  getByQuizAndUser,
  getParticipantCount,
};
