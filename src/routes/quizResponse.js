const { Router } = require('express');
const { auth } = require('../middlewares');
const { quizResponseController } = require('../controllers');

const router = Router();

router.get('/', auth, quizResponseController.getByUser);

module.exports = router;
