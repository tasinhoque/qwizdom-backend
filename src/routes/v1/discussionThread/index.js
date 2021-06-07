const { Router } = require('express');
const commentRouter = require('./comment');
const { discussionThreadController } = require('../../../controllers');

const router = Router();

router.use('/:discussionThreadId/comments', commentRouter);

router.route('/:discussionThreadId').get(discussionThreadController.get);

module.exports = router;
