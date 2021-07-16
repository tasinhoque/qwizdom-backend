const { Router } = require('express');
const { auth } = require('../middlewares');
const { quizResponseController } = require('../controllers');

const router = Router();

router.get('/', auth, quizResponseController.getByUser);
router.patch('/:quizResponseId', auth, quizResponseController.evaluate);

module.exports = router;
