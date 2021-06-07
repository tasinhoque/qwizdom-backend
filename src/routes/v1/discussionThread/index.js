const { Router } = require('express');
const commentRouter = require('./comment');

const router = Router();

router.use('/:discussionThreadId', commentRouter);

module.exports = router;
