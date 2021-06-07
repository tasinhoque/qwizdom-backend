const { Router } = require('express');
const { commentController } = require('../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', commentController.create);

module.exports = router;
