const { Router } = require('express');
const { notificationController } = require('../controllers');
const { auth } = require('../middlewares');

const router = Router();

router.get('/', auth, notificationController.getForUser);

module.exports = router;
