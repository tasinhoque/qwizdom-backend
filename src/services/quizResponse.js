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

const getByQuizForLeaderboard = async (quizId, createdAts) =>
  QuizResponse.find({
    quiz: quizId,
    createdAt: {
      $in: createdAts,
    },
  })
    .populate({
      path: 'stageResponses quiz responder',
      populate: { path: 'responses categories creator', populate: 'question' },
    })
    .sort('-createdAt');

const getByQuiz = async (filter, page, limit) =>
  QuizResponse.paginate(filter, {
    populate: 'stageResponses.responses.question,quiz.categories,responder',
    sortBy: 'createdAt:desc',
    page,
    limit,
  });

const getById = async id =>
  QuizResponse.findById(id).populate({
    path: 'stageResponses',
    populate: { path: 'responses' },
  });

const getCreatedAts = async quizId =>
  QuizResponse.aggregate([
    {
      $match: {
        $expr: { $eq: ['$quiz', Types.ObjectId(quizId)] },
      },
    },
    {
      $group: {
        _id: '$responder',
        createdAt: { $max: '$createdAt' },
      },
    },
  ]);

module.exports = {
  create,
  update,
  getByUser,
  getByQuizAndUser,
  getParticipantCount,
  getCreatedAts,
  getByQuiz,
  getByQuizForLeaderboard,
  getById,
};
