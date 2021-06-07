const { Router } = require('express');
const questionRouter = require('./question');
const { stageController } = require('../../../../controllers');

const router = Router({ mergeParams: true });

router.use('/:stageId/questions', questionRouter);

router.post('/', stageController.create);

module.exports = router;
