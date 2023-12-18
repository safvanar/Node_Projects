const Blog = require('../models/blog')
const Comment = require('../models/comment')

exports.getAddBlog = (req, res, next) => {
    res.sendFile('index.html', {root: 'views'})
}

exports.postAddBlog = async (req, res, next) => {
    try{
        const {title, author, blog} = req.body
        const blogs = await Blog.create({
            title: title,
            author: author,
            content: blog
        })
        res.status(201).json({message: 'Blog added successfully!', blogs: blogs})
    }catch(err){
        console.log(err)
        res.status(500).json({message: 'An error occured while trying to add the blog to the database!'})
    }
}

exports.postAddComment = async (req, res, next) => {
    try {
        const comment = req.body.comment
        const blogId = req.params.blogId
        const blog = await Blog.findByPk(blogId)
        await blog.createComment({
            comment: comment
        })
        res.redirect('/blogs')
    }catch(err){
        console.log(err)
    }
}

exports.deleteBlog = async (req, res, next) => {
    const blogId = req.params.blogId
    try{
        const blog = await Blog.findByPk(blogId)
        await blog.destroy()
        res.status(201).redirect('/blogs/')
    }catch(err){
        console.log(err)
    }
}

exports.deleteComment = async (req, res, next) => {
    const commentId = req.params.commentId
    try{
        const comment = await Comment.findByPk(commentId)
        await comment.destroy()
        res.status(201).redirect('/blogs/')
    }catch(err){
        console.log(err)
    }
}

exports.getAllBlogs = async (req, res, next) => {
    try{
        const blogs = await Blog.findAll()
        const comments = await Comment.findAll()
        res.status(201).json({mesages: 'Fetched all blogs successfully', blogs: blogs, comments: comments})
    }catch(error){
        res.status(500).json({message: 'error fetching data'})
    }
}