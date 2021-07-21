const { Router } = require('express');
const { auth } = require('../middlewares');
const { commentController } = require('../controllers');

const router = Router();

router
  .route('/:commentId')
  .patch(auth, commentController.update)
  .delete(auth, commentController.remove);

module.exports = router;
