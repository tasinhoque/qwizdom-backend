const { Router } = require('express');
const { userController } = require('../../../../controllers');
const responseRouter = require('./response');

const router = Router({ mergeParams: true });

router.use('/:quizId/responses', responseRouter);

router.post('/:quizId/subscription/flip', userController.flipSubscription);

module.exports = router;
