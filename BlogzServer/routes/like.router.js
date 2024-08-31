// routes/likeRoutes.js
const express = require('express');
const router = express.Router();
const { getLike, likePost, unlikePost } = require('../controllers/like.controller');
const verifyToken = require('../utils/verifyToken');

// Like a post
router.post('/like/:postId', verifyToken, likePost);

// get like
router.get('/get/:postId', verifyToken, getLike);

// Unlike a post
router.delete('/unlike/:postId', verifyToken, unlikePost);

module.exports = router;
