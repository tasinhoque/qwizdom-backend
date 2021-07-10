const { Router } = require('express');
const { auth } = require('../../middlewares');
const { commentController } = require('../../controllers');

const router = Router({ mergeParams: true });

router.get('/', auth, commentController.getByDiscussionThread);
router.post('/', auth, commentController.create);

module.exports = router;
