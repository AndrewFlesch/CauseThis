const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Utils = require('../../models/Utils');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @ route Post api/posts
// @desc Post
// @ access Private

router.post('/', [
  auth, [
    check('name', 'Name is required').not().isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newUtils = new Utils({
      name: req.body.name,
      items: req.body.items
    });

    const post = await newUtils.save();
    res.json(post);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route Get api/posts
// @desc Get all posts
// @ access Private
router.get('/', auth, async (req, res) => {
  try{
    const posts = await Utils.find().sort({ name:1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @ route Get api/posts
// @desc Get all posts
// @ access Private
router.get('/:id', auth, async (req, res) => {
  try{
    const post = await Utils.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error' + err.message);
  }

});

// @ route Update api/posts
// @desc update a posts
// @ access Private
router.put('/:id', auth, async (req, res) => {

       const { items} = req.body;

       const updateUtils = {};
       if (items) updateUtils.items = items;

  try{
    const post = await Utils.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { items: items } }
    );
    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error' + err.message);
  }

});


// @ route Delete api/posts
// @desc Delete a posts
// @ access Private

router.delete('/:id', auth, async (req, res) => {
  try{
    const post = await Utils.findById(req.params.id);



  await post.remove();

    res.json({ msg: 'PostConfig removed'});

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }

});



module.exports = router;
