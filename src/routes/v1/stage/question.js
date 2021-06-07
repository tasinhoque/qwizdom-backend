const { Router } = require('express');
const { questionController } = require('../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', questionController.create);

module.exports = router;
