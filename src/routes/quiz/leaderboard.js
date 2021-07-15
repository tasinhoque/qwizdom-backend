const { Router } = require('express');
const { leaderboardController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.get('/', auth, leaderboardController.get);

module.exports = router;
