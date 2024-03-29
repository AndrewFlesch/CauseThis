const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @ route Post api/posts
// @desc Post
// @ access Private

router.post('/', [
  auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ]
], async (req, res) => {
  console.error('Post File');
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      title: req.body.title,
      category: req.body.category,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Serer Error');
  }
});

// @ route Get api/posts
// @desc Get all posts
// @ access Private
router.get('/', auth, async (req, res) => {
  try{
    const posts = await Post.find().sort({ date: -1});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @ route Delete api/posts
// @desc Delete a posts
// @ access Private

router.delete('/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

  //Check user
  if(post.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  await post.remove();

    res.json({ msg: 'Post removed'});

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }

});



module.exports = router;
