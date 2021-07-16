const { Router } = require('express');
const { quizResponseController } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = Router({ mergeParams: true });

router.post('/', auth, quizResponseController.create);
router.post('/complete', auth, quizResponseController.createComplete);
router.get('/complete', auth, quizResponseController.getByQuizAndUser);
router.get(
  '/complete/:userId',
  auth,
  quizResponseController.getByQuizAndUserOther
);

router.get('/all', auth, quizResponseController.getByQuiz);

module.exports = router;
