const { Router } = require('express');
const questionRoute = require('./question');
const { stageController } = require('../../../../controllers');

const router = Router({ mergeParams: true });

router.use('/:stageId/questions', questionRoute);

router.post('/', stageController.create);

module.exports = router;
