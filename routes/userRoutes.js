const express = require('express');
const userController = require('../controller/userController');
const verify = require('../middleware/auth');
const router = express.Router();

router.get('/post', verify.verifyToken, userController.getUsersPosts);
router.post('/post', verify.verifyToken, userController.createPost);
router.get('/allposts', verify.verifyToken, userController.getAllPosts);
router.post('/signup', userController.signup);
router.post('/signin', userController.signin);

module.exports = router;