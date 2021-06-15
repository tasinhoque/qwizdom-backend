const { Router } = require('express');
const { auth } = require('../../middlewares');
const { userController } = require('../../controllers');

const router = Router();

router.get('/', auth, userController.getUsers);

router
  .route('/:userId')
  .get(auth, userController.getUser)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

module.exports = router;
