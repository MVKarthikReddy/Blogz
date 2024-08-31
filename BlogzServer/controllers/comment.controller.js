const Comment = require('../models/comment.model')

// Posting comment for a blog
const postComment = async (req, res) => {
    const { postId, userId, comment } = req.body;
  
    try {
      const comments = await Comment.find({ userId, postId })
      console.log(comments)
      if(comments.length==0){

        const newComment = new Comment({ postId, userId, comment });
        await newComment.save();

        req.io.emit('new-comment', newComment); // to emit the new comment event to all connected clients using Socket.io

        res.status(201).json(newComment);

      }
      console.log('out side if')
      
     res.status(403).json('You already commented!')
      


    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };


// Getting all the comments of a blog
const getComments = async (req, res) => {
    
    try {
      const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });

      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };


module.exports = {
    postComment,
    getComments
}  