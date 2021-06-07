const { Router } = require('express');
const { stageController } = require('../../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', stageController.create);

module.exports = router;
