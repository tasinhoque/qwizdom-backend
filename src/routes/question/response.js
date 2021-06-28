const { Router } = require('express');
const { questionResponseController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, questionResponseController.create);

module.exports = router;
