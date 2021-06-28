const { Router } = require('express');
const { reviewController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, reviewController.create);

module.exports = router;
