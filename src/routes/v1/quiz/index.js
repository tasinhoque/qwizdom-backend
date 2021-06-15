const { Router } = require('express');
const { quizController } = require('../../../controllers');
const { auth } = require('../../../middlewares');
const discussionThreadRouter = require('./discussionThread');
const leaderboardRouter = require('./leaderboard');
const reviewRouter = require('./review');
const stageRouter = require('./stage');

const router = Router();

router.use('/:quizId/discussion-threads', discussionThreadRouter);
router.use('/:quizId/leaderboard', leaderboardRouter);
router.use('/:quizId/stages', stageRouter);
router.use('/:quizId/reviews', reviewRouter);

router.route('/').get(auth(), quizController.get).post(auth('general'), quizController.create);

module.exports = router;
