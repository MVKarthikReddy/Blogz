const express = require('express');
const User = require('../controllers/user.controller.js');
const verifyToken = require('../utils/verifyToken.js')


const router = express.Router();

router.post("/signout",User.signout);
router.get('/:id', User.getUser)
router.get('/blogs/:id',verifyToken , User.getUserBlogs)
// router.post('/signin',Auth.signin);
// router.post('/google',Auth.google);

module.exports = router;