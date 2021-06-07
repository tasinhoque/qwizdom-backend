const authService = require('./auth');
const emailService = require('./email');
const tokenService = require('./token');
const userService = require('./user');
const quizService = require('./quiz');
const categoryService = require('./category');
const commentService = require('./comment');
const discussionThreadService = require('./discussionThread');
const leaderboardService = require('./leaderboard');
const notificationService = require('./notification');
const questionService = require('./question');
const questionResponseService = require('./questionResponse');
const quizResponseService = require('./quizResponse');
const reviewService = require('./review');
const stageService = require('./stage');

module.exports = {
  authService,
  emailService,
  tokenService,
  userService,
  quizService,
  categoryService,
  commentService,
  discussionThreadService,
  leaderboardService,
  notificationService,
  questionService,
  questionResponseService,
  quizResponseService,
  reviewService,
  stageService,
};
