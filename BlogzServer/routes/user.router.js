const express = require('express');
const User = require('../controllers/user.controller.js');
const verifyToken = require('../utils/verifyToken.js')


const router = express.Router();

router.post("/signout",User.signout);
router.put('/update/:id',verifyToken, User.updateUser);
router.get('/:id', User.getUser)
router.get('/blogs/:id',verifyToken , User.getUserBlogs)
router.delete('/delete/:id', User.deleteUser);

module.exports = router;