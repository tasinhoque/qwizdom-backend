const { Router } = require('express');
const { reviewController } = require('../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', reviewController.create);

module.exports = router;
