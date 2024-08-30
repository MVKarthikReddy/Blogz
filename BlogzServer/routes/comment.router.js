const express = require('express');
const Comment = require('../controllers/comment.controller.js');
const verifyToken = require('../utils/verifyToken.js')


const router = express.Router();

router.post('/post',verifyToken,Comment.postComment)
router.get('/:postId',Comment.getComments)

module.exports = router