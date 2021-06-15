const { Router } = require('express');
const { quizController, userController } = require('../../../controllers');
const { auth } = require('../../../middlewares');
const discussionThreadRouter = require('./discussionThread');
const leaderboardRouter = require('./leaderboard');
const reviewRouter = require('./review');
const stageRouter = require('./stage');
const responseRouter = require('./response');

const router = Router();

router.use('/:quizId/responses', responseRouter);
router.use('/:quizId/discussion-threads', discussionThreadRouter);
router.use('/:quizId/leaderboard', leaderboardRouter);
router.use('/:quizId/stages', stageRouter);
router.use('/:quizId/reviews', reviewRouter);

router.route('/').get(auth, quizController.get).post(auth, quizController.create);

router.get('/subscribed', auth, userController.getSubscribedQuizzes);
router.get('/published', auth, userController.getCreatedQuizzes);
router.get('/draft', auth, userController.getCreatedQuizzes);
router.post('/:quizId/subscription/flip', auth, userController.flipSubscription);

module.exports = router;
