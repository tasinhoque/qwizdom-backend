const { Router } = require('express');
const questionRoute = require('./question');

const router = Router();

router.use('/:stageId/questions', questionRoute);

module.exports = router;
