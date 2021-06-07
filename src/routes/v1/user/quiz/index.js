const { Router } = require('express');
const responseRouter = require('./response');

const router = Router({ mergeParams: true });

router.use('/:quizId/responses', responseRouter);

module.exports = router;
