const express = require('express');
const { authController } = require('../controllers');
const { auth } = require('../middlewares');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-tokens', authController.refreshTokens);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/send-verification-email', auth, authController.sendVerificationEmail);
router.post('/verify-email', authController.verifyEmail);

module.exports = router;
