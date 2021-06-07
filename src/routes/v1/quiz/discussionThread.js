const { Router } = require('express');
const { discussionThreadController } = require('../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', discussionThreadController.create);

module.exports = router;
