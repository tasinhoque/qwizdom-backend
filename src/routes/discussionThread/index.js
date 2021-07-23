const { Router } = require('express');
const commentRouter = require('./comment');
const { auth } = require('../../middlewares');
const { discussionThreadController } = require('../../controllers');

const router = Router();

router.use('/:discussionThreadId/comments', commentRouter);

router
  .route('/:discussionThreadId')
  .get(auth, discussionThreadController.get)
  .patch(auth, discussionThreadController.update)
  .delete(auth, discussionThreadController.remove);

router.post(
  '/:discussionThreadId/upvote/flip',
  auth,
  discussionThreadController.flipUpvote
);

router.post(
  '/:discussionThreadId/downvote/flip',
  auth,
  discussionThreadController.flipDownvote
);

module.exports = router;
