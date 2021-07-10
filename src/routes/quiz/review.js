const { Router } = require('express');
const { reviewController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, reviewController.create);

router.get('/rating/average', auth, reviewController.getAverageRating);

module.exports = router;
