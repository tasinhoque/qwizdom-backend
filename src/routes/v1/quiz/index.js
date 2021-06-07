const { Router } = require('express');
const { quizController } = require('../../../controllers');
const discussionThreadRoute = require('./discussionThread');
const leaderboardRoute = require('./leaderboard');
const responseRoute = require('./response');
const reviewRoute = require('./review');
const stageRoute = require('./stage');

const router = Router();

router.use('/:quizId/discussion-threads', discussionThreadRoute);
router.use('/:quizId/leaderboard', leaderboardRoute);
router.use('/:quizId/stages', stageRoute);
router.use('/:quizId/responses', responseRoute);
router.use('/:quizId/reviews', reviewRoute);

router.route('/').post(quizController.create);

module.exports = router;
