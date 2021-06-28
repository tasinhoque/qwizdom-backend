const { Router } = require('express');
const { auth } = require('../middlewares');
const { categoryController } = require('../controllers');

const router = Router();

router.route('/').post(auth, categoryController.create).get(auth, categoryController.get);

// router.route('/:categoryId').patch(auth, categoryController.update).get(auth, categoryController.getById);

module.exports = router;
