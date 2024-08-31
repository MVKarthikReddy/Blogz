// controllers/likeController.js
const Like = require('../models/like.model');
const Blog = require('../models/blog.model');

// get a Like

const getLike = async (req,res) => {
    const {postId} = req.params
    const userId = req.user.id;
    try {
        // Checking whether the user has already liked the post or not
        const existingLike = await Like.findOne({ userId, postId });
        
        if (existingLike) {
          return res.status(200).json({ message: 'You have already liked this post.' });
        }
        return res.status(400).json({message: 'Not liked yet'})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
      }

}

// Like a post
const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ userId, postId });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }

    // Create a new like
    const like = await Like.create({ userId, postId });

    // Increment the like count on the post
    const post = await Blog.findById(postId);
    console.log(post)
    post.likesCount += 1;
    await post.save();

    // Emit the like event through socket.io
    req.io.emit('like', { postId, likesCount: post.likesCount });

    res.status(201).json({ message: 'You liked the blog.', likesCount: post.likesCount });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// To unlike a post
const unlikePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id;

  console.log(postId,userId)

  try {
    // Check if the user has liked the post
    const existingLike = await Like.findOne({ userId, postId });
    if (!existingLike) {
      return res.status(400).json({ message: 'You have not liked this post.' });
    }

    // Remove the like
    await Like.findByIdAndDelete(existingLike._id);

    console.log('unliked the blog')

    // Decrement the like count on the post
    const post = await Blog.findById(postId);
    post.likesCount -= 1;
    await post.save();

    // Emit the unlike event through socket.io
    req.io.emit('unlike', { postId, likesCount: post.likesCount });

    res.status(200).json({ message: 'Post unliked.', likesCount: post.likesCount });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
    getLike,
    likePost,
    unlikePost
}
