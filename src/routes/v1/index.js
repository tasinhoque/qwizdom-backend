const express = require('express');
const authRoute = require('./auth');
const userRoute = require('./user');
const docsRoute = require('./docs');
const quizRoute = require('./quiz');
const categoryRoute = require('./category');
const commentRoute = require('./comment');
const discussionThreadRoute = require('./discussionThread');
const questionRoute = require('./question');
const questionResponseRoute = require('./questionResponse');
const quizResponseRoute = require('./quizResponse');
const reviewRoute = require('./review');
const stageRoute = require('./stage');
const notificationRoute = require('./user/notification');
const { config } = require('../../config');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/quizzes', quizRoute);
router.use('/categories', categoryRoute);
router.use('/comments', commentRoute);
router.use('/discussion-threads', discussionThreadRoute);
router.use('/questions', questionRoute);
router.use('/question-responses', questionResponseRoute);
router.use('/quiz-responses', quizResponseRoute);
router.use('/reviews', reviewRoute);
router.use('/stages', stageRoute);
router.use('/notifications', notificationRoute);

/* istanbul ignore next */
if (config.env === 'development') {
  router.use('/docs', docsRoute);
}

module.exports = router;
