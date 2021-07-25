const { Router } = require('express');
const { stageController } = require('../../controllers');
const questionRouter = require('./question');

const router = Router();

router.delete('/:stageId', stageController.remove);

router.use('/:stageId/questions', questionRouter);

module.exports = router;
