const express = require('express');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const ConfigForms = require('../../models/ConfigForms');
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
    const newConfigForm = new ConfigForms({
      name: req.body.name,
      category: req.body.category,
      parent: req.body.parent,
      children: req.body.children,
      openToChildren: req.body.openToChildren,
      level: req.body.level,
      formtype: req.body.formtype,
      formoptions: req.body.formoptions,
      notes: req.body.notes,
      description: req.body.description
    });

    const post = await newConfigForm.save();
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
    const posts = await ConfigForms.find().sort({ formtype:1, name:1 });
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
    const post = await ConfigForms.findById(req.params.id);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error' + err.message);
  }

});

// @ route Update api/posts
// @desc update a posts
// @ access Private
router.post('/:id', auth, async (req, res) => {

       const { name, category, parent, children, openToChildren, level, formtype, formoptions, notes, description} = req.body;

       const updateConfigFields = {};
       if (name) updateConfigFields.name = name;
       if (category) updateConfigFields.category = category;
       if (parent) updateConfigFields.parent = parent;
       if (children) updateConfigFields.children = children;
       if (openToChildren) updateConfigFields.openToChildren = openToChildren;
       if (level) updateConfigFields.level = level;
       if (formtype) updateConfigFields.formtype = formtype;
       if (formoptions) updateConfigFields.formoptions = formoptions;
       if (notes) updateConfigFields.notes = notes;
        if (description) updateConfigFields.description = description;

  try{
    const updateConfigform = await ConfigForms.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateConfigFields },
      { new: true }
    );
    res.json(updateConfigform);
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
    const post = await ConfigForms.findById(req.params.id);



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
