const { QuizResponse } = require('../models');

const create = async body => QuizResponse.create(body);

const update = async (id, updateBody) =>
  QuizResponse.findByIdAndUpdate(id, updateBody, { new: true }).orFail();

const getByUser = async userId => QuizResponse.find({ responder: userId });

const getByQuizAndUser = async (quizId, userId) =>
  QuizResponse.find({ responder: userId, quiz: quizId })
    .populate({
      path: 'stageResponses',
      populate: { path: 'responses', populate: 'question' },
    })
    .sort('-createdAt');

module.exports = {
  create,
  update,
  getByUser,
  getByQuizAndUser,
};
