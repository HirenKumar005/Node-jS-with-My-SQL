const { Router } = require('express');
const express = require('express');
const { upload } = require('../../startup/multer');
const user = require('../../controllers/userController');
const { generateToken, authenticate } = require('../../middleware/auth')
const router = express();
router.get('', user.register);
router.post('/signUp', upload.single('profile'), user.signup);
router.post('/login', generateToken, user.login);
router.post('/forgot', user.forgot);
router.post('/verifyotp', user.verifyotp);
router.post('/resetpassword', user.resetpassword);
router.get('/viewprofile', authenticate, user.viewprofile);
router.post('/updateprofile', authenticate, upload.single('profile'), user.updateprofile);
router.post('/updatePassword', authenticate, user.updatePassword);
module.exports = router;