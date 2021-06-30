const { Router } = require('express');
const { quizResponseController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, quizResponseController.create);
router.post('/complete', auth, quizResponseController.createComplete);

module.exports = router;
