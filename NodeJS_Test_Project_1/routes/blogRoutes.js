const express = require('express')

const blogController = require('../controllers/blogControllers')

const router = express.Router()

router.post('/addBlog', blogController.postAddBlog)
router.post('/addComment/:blogId', blogController.postAddComment)
router.delete('/deleteComment/:commentId', blogController.deleteComment)
router.delete('/deleteBlog/:blogId', blogController.deleteBlog)
router.get('/getAllBlogs', blogController.getAllBlogs)
router.get('/', blogController.getAddBlog)

module.exports = router