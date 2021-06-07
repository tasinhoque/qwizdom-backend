const { Router } = require('express');
const { quizController } = require('../../controllers');

const router = Router();

router.route('/').post(quizController.create);

module.exports = router;
