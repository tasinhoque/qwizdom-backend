const { Router } = require('express');
const { discussionThreadController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, discussionThreadController.create);
router.get('/', auth, discussionThreadController.getByQuiz);

module.exports = router;
