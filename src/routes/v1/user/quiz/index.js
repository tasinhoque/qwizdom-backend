const { Router } = require('express');
const { userController } = require('../../../../controllers');
const responseRouter = require('./response');

const router = Router({ mergeParams: true });

router.use('/:quizId/responses', responseRouter);

router.get('/subscribed', userController.getSubscribedQuizzes);
router.get('/published', userController.getCreatedQuizzes);
router.get('/draft', userController.getCreatedQuizzes);
router.post('/:quizId/subscription/flip', userController.flipSubscription);

module.exports = router;
