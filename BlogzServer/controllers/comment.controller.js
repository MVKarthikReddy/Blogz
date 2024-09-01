const Comment = require('../models/comment.model')
const User = require('../models/user.model')
const {getUser} = require('./user.controller')

// Posting comment for a blog
const postComment = async (req, res) => {
    const { postId, comment } = req.body;
    userId = req.user.id
  
    try {
      const comments = await Comment.find({ userId, postId })
      if(comments.length==0){

        const newComment = new Comment({ postId, userId, comment });
        await newComment.save();

        const user = await User.findById((newComment.userId).toHexString())

        const cmt = {...newComment._doc,username:user.username,profilePicture:user.profilePicture}

        req.io.emit('new-comment', cmt); // to emit the new comment event to all connected clients using Socket.io

        return res.status(201).json(cmt);

      }
      
     res.status(403).json('You already commented!')
      


    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };


// Getting all the comments of a blog
const getComments = async (req, res) => {

    try {
      const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
      if(comments.length>0){
          var promises = comments.map(async (comment) => {

          const user = await User.findById((comment.userId).toHexString())
          const { username, profilePicture, ...rest } = user._doc;

          return {...comment._doc,username,profilePicture}
        })
        
      }
      const cmt = await Promise.all(promises)

      res.json(cmt);
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };


module.exports = {
    postComment,
    getComments
}  