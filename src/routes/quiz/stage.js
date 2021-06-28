const { Router } = require('express');
const { stageController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, stageController.create);

module.exports = router;
