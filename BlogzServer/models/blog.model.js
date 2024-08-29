
const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
    {
        
        author: {
            type: String,
            required: true,
          },
        category: {
            type: String,
            required: true,
          },
        title: {
            type: String,
            required: true,
          },
        intro: {
            type: String,
            required: true,
          },
        description : {
            type: Object,
            required: true,
          },
          readTime: {
            type: String,
            required: true,
          },
        imageUrls:{
            type: String,
            required: true,
          },
        userRef: {
            type: String,
            required: true,
          },

    },
    { timestamps: true }
)

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog