const { Router } = require('express');
const commentRouter = require('./comment');

const router = Router();

router.use('/:discussionThreadId/comments', commentRouter);

module.exports = router;
