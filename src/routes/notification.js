const { Router } = require('express');
const { notificationController } = require('../controllers');
const { auth } = require('../middlewares');

const router = Router();

router.get('/', auth, notificationController.getForUser);
router.get('/unread/count', auth, notificationController.getUnread);
router.post('/:notificationId/read', auth, notificationController.markAsRead);

module.exports = router;
