const { Router } = require('express');
const { userController, quizResponseController } = require('../controllers');
const { auth, uploadFile } = require('../middlewares');
const { multer } = require('../config');

const router = Router();

router.get('/', auth, userController.getUsers);
router.patch('/', auth, userController.updateLoggedInUser);
router.patch(
  '/avatar',
  auth,
  multer.single('avatar'),
  uploadFile,
  userController.updateAvatar
);

router.get('/tasks/creator', auth, quizResponseController.getTaskPageData);
router.get(
  '/tasks/participant',
  auth,
  userController.getUpcomingSubscribedQuizzes
);

router
  .route('/:userId')
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

module.exports = router;
