const { Router } = require('express');
const { auth } = require('../../middlewares');
const { userController } = require('../../controllers');

const router = Router();

router.route('/').get(auth, userController.getUsers);

router
  .route('/:userId')
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

router.get('/:userId/quiz-responses', auth, userController.getQuizResponses);

module.exports = router;
