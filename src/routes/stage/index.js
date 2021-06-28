const { Router } = require('express');
const questionRouter = require('./question');

const router = Router();

router.use('/:stageId/questions', questionRouter);

module.exports = router;
