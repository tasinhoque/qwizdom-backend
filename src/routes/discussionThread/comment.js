const { Router } = require('express');
const { auth } = require('../../middlewares');
const { discussionThreadController, commentController } = require('../../controllers');

const router = Router({ mergeParams: true });

router.get('/', auth, discussionThreadController.getAllComments);
router.post('/', auth, commentController.create);

module.exports = router;
