const { Router } = require('express');
const commentRoute = require('./comment');

const router = Router();

router.use('/:discussionThreadId', commentRoute);

module.exports = router;
