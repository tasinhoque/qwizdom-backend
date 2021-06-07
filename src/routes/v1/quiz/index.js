const { Router } = require('express');
const { quizController } = require('../../../controllers');
const discussionThreadRouter = require('./discussionThread');
const leaderboardRouter = require('./leaderboard');
const responseRouter = require('./response');
const reviewRouter = require('./review');
const stageRouter = require('./stage');

const router = Router();

router.use('/:quizId/discussion-threads', discussionThreadRouter);
router.use('/:quizId/leaderboard', leaderboardRouter);
router.use('/:quizId/stages', stageRouter);
router.use('/:quizId/responses', responseRouter);
router.use('/:quizId/reviews', reviewRouter);

router.route('/').post(quizController.create);

module.exports = router;
