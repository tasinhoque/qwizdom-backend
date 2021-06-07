const authController = require('./auth');
const userController = require('./user');
const quizController = require('./quiz');
const categoryController = require('./category');
const commentController = require('./comment');
const discussionThreadController = require('./discussionThread');
const leaderboardController = require('./leaderboard');
const notificationController = require('./notification');
const questionController = require('./question');
const questionResponseController = require('./questionResponse');
const quizResponseController = require('./quizResponse');
const reviewController = require('./review');
const stageController = require('./stage');

module.exports = {
  authController,
  userController,
  quizController,
  categoryController,
  commentController,
  discussionThreadController,
  leaderboardController,
  notificationController,
  questionController,
  questionResponseController,
  quizResponseController,
  reviewController,
  stageController,
};
