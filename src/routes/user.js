const { Router } = require('express');
const { userController } = require('../controllers');
const { auth, uploadFile } = require('../middlewares');
const { multer } = require('../config');

const router = Router();

router.get('/', auth, userController.getUsers);
router.patch('/', auth, userController.updateLoggedInUser);
router.patch('/avatar', auth, multer.single('avatar'), uploadFile, userController.updateAvatar);

router
  .route('/:userId')
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

module.exports = router;
