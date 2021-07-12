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

const getCreatedAts3 = async quizId =>
  QuizResponse.find({
    quiz: quizId,
    createdAt: {
      $in: [
        new Date('2021-07-12T09:54:04.810Z'),
        new Date('2021-07-11T16:17:32.540Z'),
      ],
    },
  })
    .populate({
      path: 'stageResponses quiz',
      populate: { path: 'responses categories creator', populate: 'question' },
    })
    .sort('-createdAt');

const getByQuiz = async (quizId, createdAts, page, limit) =>
  QuizResponse.paginate(
    {
      quiz: quizId,
      createdAt: { $in: createdAts },
    },
    {
      populate: 'stageResponses.responses.question,quiz.categories',
      sortBy: 'createdAt:desc',
      page,
      limit,
    }
  );

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
  getCreatedAts3,
};
