const { Router } = require('express');
const {
  quizController,
  userController,
  quizResponseController,
} = require('../../controllers');
const { auth, uploadFile } = require('../../middlewares');
const { multer } = require('../../config');
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

router
  .route('/')
  .get(auth, quizController.get)
  .post(auth, quizController.create);

router.post('/:quizId/complete', auth, quizController.createComplete);
router.patch('/:quizId/complete', auth, quizController.updateComplete);
router.get('/subscribed', auth, userController.getSubscribedQuizzes);
router.get('/published', auth, quizController.getByCreator);
router.get('/draft', auth, quizController.getByCreator);
router.get(
  '/participated-in',
  auth,
  quizResponseController.quizzesParticipatedIn
);
router.get('/:quizId/pie-chart', auth, quizResponseController.getPieChartData);

router
  .route('/:quizId')
  .get(auth, quizController.getById)
  .patch(auth, quizController.update)
  .delete(auth, quizController.remove);

router.get('/:quizId/complete', auth, quizController.getByIdComplete);

router.post(
  '/:quizId/subscription/flip',
  auth,
  userController.flipSubscription
);

router.get(
  '/:quizId/subscriber/count',
  auth,
  quizController.getSubscriberCount
);

router.get(
  '/:quizId/participant/count',
  auth,
  quizController.getParticipantCount
);

router.post(
  '/:quizId/cover',
  auth,
  multer.single('cover'),
  uploadFile,
  quizController.updateCover
);

module.exports = router;
