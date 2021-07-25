const { Router } = require('express');
const responseRouter = require('./response');
const { auth, uploadFile } = require('../../middlewares');
const { questionController } = require('../../controllers');
const { multer } = require('../../config');

const router = Router();

router.use('/:questionId/responses', responseRouter);

router.patch(
  '/:questionId/image',
  auth,
  multer.single('image'),
  uploadFile,
  questionController.uploadImage
);

router.delete('/:questionId', questionController.remove);

module.exports = router;
