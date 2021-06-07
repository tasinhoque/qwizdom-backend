const { Router } = require('express');
const responseRoute = require('./response');

const router = Router();

router.use('/:questionId/responses', responseRoute);

module.exports = router;
