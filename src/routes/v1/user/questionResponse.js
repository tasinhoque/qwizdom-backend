const { Router } = require('express');
const { questionResponseController } = require('../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', questionResponseController.create);

module.exports = router;
