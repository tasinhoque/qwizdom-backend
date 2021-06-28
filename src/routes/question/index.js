const { Router } = require('express');
const responseRouter = require('./response');

const router = Router();

router.use('/:questionId/responses', responseRouter);

module.exports = router;
