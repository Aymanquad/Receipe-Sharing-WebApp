const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');


router.get('/signup',authController.getSignUp);

router.post('/signup',authController.postSignUp);

router.get('/login',authController.getLogin);

router.get('/reset',authController.getresetPasswordPage);

router.get('/new-password',authController.getNewPasswordPage);


module.exports = router;