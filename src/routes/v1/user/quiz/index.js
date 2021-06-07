const { Router } = require('express');
const responseRouter = require('./response');

const router = Router({ mergeParams: true });

responseRouter.use('/:quizId/responses');

module.exports = router;
