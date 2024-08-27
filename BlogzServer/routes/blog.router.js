const express = require('express')
const {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getAllBlogs
} = require('../controllers/blog.controller.js')
const verifyToken = require('../utils/verifyToken.js')

const router = express.Router()

router.post('/create',verifyToken,createBlog)
router.put('/update/:id',verifyToken,updateBlog)
router.delete('/delete/:id',verifyToken,deleteBlog)
router.get('/get/:id',getBlog)
router.get('/get',getAllBlogs)
router.get('/')

module.exports = router