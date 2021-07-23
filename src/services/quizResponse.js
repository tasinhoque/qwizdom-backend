const { Types } = require('mongoose');
const { QuizResponse } = require('../models');

const create = async body => QuizResponse.create(body);

const update = async (id, updateBody) =>
  QuizResponse.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const getByUser = async userId =>
  QuizResponse.find({ responder: userId }).populate('quiz');

const quizzesParticipatedIn = async userId =>
  QuizResponse.find(
    {
      responder: userId,
    },
    'quiz'
  );

const getByQuizAndUser = async (quizId, userId) =>
  QuizResponse.find({ responder: userId, quiz: quizId })
    .populate({
      path: 'stageResponses quiz responder',
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

const getPendingCount = async (quizId, createdAts) =>
  QuizResponse.countDocuments({
    quiz: quizId,
    createdAt: { $in: createdAts },
    isEvaluated: false,
  });

const getByQuizForLeaderboardEvaluated = async (quizId, createdAts) =>
  QuizResponse.find({
    quiz: quizId,
    createdAt: { $in: createdAts },
    isEvaluated: true,
  })
    .populate({ path: 'responder' })
    .sort('-totalPoints');

const getByQuizForLeaderboardPending = async (quizId, createdAts) =>
  QuizResponse.find({
    quiz: quizId,
    createdAt: { $in: createdAts },
    isEvaluated: false,
  }).populate({ path: 'responder' });

const getByQuizForPieChart = async (quizId, createdAts) =>
  QuizResponse.find({
    quiz: quizId,
    createdAt: { $in: createdAts },
  }).populate({
    path: 'stageResponses',
    populate: { path: 'responses', populate: 'question' },
  });

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
    populate: 'responses',
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
  getByQuizForLeaderboardEvaluated,
  getByQuizForLeaderboardPending,
  getById,
  quizzesParticipatedIn,
  getByQuizForPieChart,
  getPendingCount,
};
