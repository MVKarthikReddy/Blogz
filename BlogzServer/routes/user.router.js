const express = require('express');
const User = require('../controllers/user.controller.js');

const router = express.Router();

router.post("/signout",User.signout);
router.get('/:id', User.getUser)

// router.post('/signin',Auth.signin);
// router.post('/google',Auth.google);

module.exports = router;