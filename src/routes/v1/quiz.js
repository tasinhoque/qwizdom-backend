const { Router } = require('express');
// const validate = require('../../middlewares/validate');
// const { quizValidation } = require('../../validations');
const { quizController } = require('../../controllers');

const router = Router();

router.route('/').post(quizController.create);

module.exports = router;
