const { Router } = require('express');
const { discussionThreadController } = require('../../../controllers');

const router = Router({ mergeParams: true });

router.get('/', discussionThreadController.getAllComments);

module.exports = router;
