const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Register User
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// Follow User
router.post('/:id/follow', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (!user.followers.includes(userId)) {
      user.followers.push(userId);
      currentUser.following.push(id);
      await user.save();
      await currentUser.save();
      res.status(200).json('User followed successfully');
    } else {
      res.status(400).json('Already following this user');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
