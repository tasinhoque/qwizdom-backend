const { Router } = require('express');
const { quizResponseController } = require('../../../../controllers');

const router = Router({ mergeParams: true });

router.post('/', quizResponseController.create);

module.exports = router;
