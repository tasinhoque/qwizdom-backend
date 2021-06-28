const { Router } = require('express');
const { questionController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, questionController.create);

module.exports = router;
