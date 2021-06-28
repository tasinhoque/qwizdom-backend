const { Router } = require('express');
const { quizResponseController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, quizResponseController.create);

module.exports = router;
