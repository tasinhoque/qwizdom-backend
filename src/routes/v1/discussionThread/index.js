const { Router } = require('express');
const commentRouter = require('./comment');
const { auth } = require('../../../middlewares');
const { discussionThreadController } = require('../../../controllers');

const router = Router();

router.use('/:discussionThreadId/comments', commentRouter);

router.route('/:discussionThreadId').get(auth, discussionThreadController.get);

module.exports = router;
