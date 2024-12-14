const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

// Create Post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name username').populate('comments.user', 'name username');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like Post
router.post('/:id/like', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
      res.status(200).json('Post liked successfully');
    } else {
      res.status(400).json('Already liked this post');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
