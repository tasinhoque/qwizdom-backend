const { Router } = require('express');
const { quizController, userController } = require('../../../controllers');
const { auth, uploadFile } = require('../../../middlewares');
const { multer } = require('../../../config');
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

router.route('/:quizId').get(auth, quizController.getById);

router.get('/subscribed', auth, userController.getSubscribedQuizzes);
router.get('/published', auth, quizController.getByCreator);
router.get('/draft', auth, quizController.getByCreator);
router.post('/:quizId/subscription/flip', auth, userController.flipSubscription);
router.post('/:quizId/cover', auth, multer.single('cover'), uploadFile, quizController.updateCover);

module.exports = router;
