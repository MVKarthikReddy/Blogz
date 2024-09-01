
const Blog = require('../models/blog.model')

/* ------------************-------------------- */
/* Create a Blog */

const createBlog = async (req,res,next) => {
    const body = req.body

    try {
        const newBody = {...body, userRef: req.user.id} // adding user reference using destructuring

        const blog = await Blog.create(newBody) // creating a new Blog

        return res.status(201).json(blog) 
        
    } catch (error) {
        next(error)  // raising error in the middleware
    }

}


/* ------------************-------------------- */
/* Update a Blog */

const updateBlog = async (req,res,next) => {

    const blog = await Blog.findById(req.params.id)

    if(!blog){
        return next(errorHandler(404, "No blog found with that id"));
    }

    if(req.user.id !== blog.userRef){
        return next(errorHandler(401,'Unauthorized You can only update your own blogs!'));
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id, 
            req.body ,
            {new:true}
        );
        res.status(200).json(updatedBlog);
    } catch (error) {
        next(error)
    }

}

/* ------------************-------------------- */
/* Delete a Blog */

const deleteBlog = async (req,res,next) => {

    const blog = await Blog.findById(req.params.id)

    if(!blog){
        return next(errorHandler(404, "No blog found with that id"));
    }

    if(req.user.id !== blog.userRef){
        return next(errorHandler(401,'Unauthorized You can only delete your own blogs!'));
    }

    try {
        await Blog.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json('successfully deleted the blog');
    } catch (error) {
        next(error)
    }

}

/* ------------************-------------------- */
/* Get a Blog */

const getBlog = async (req,res,next) => {
    
    try {
        const blog = await Blog.findById(req.params.id)

        if(!blog){
            return next(errorHandler(404, "No blogs found with that id"));
        }
        res.status(200).json(blog);
    } catch (error) {
        next(error)
    }

}


/* ------------************-------------------- */
/* Get all Blogs */

const getAllBlogs = async (req,res,next) => {
    const category = req.query.category || false
    const limit = parseInt(req.query.limit) || 9 
    
    try {
        if(category){
            var blogs = await Blog.find({
                category
            }).limit(limit);
        }
        else{
            var blogs = await Blog.find();
        }

        if(!blogs){
            return next(errorHandler(404, "No blog found with that id"));
        }

        res.status(200).json(blogs);
    } catch (error) {
        next(error)
    }

}


module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getAllBlogs
}






