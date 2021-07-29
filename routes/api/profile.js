const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @ route Get api/Profile/me
// @desc Get current user profile
// @ access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user',['name','avatar']);
    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user'});
    }

    res.json(profile);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @ route Post api/Profile/
// @desc Create or update user profile
// @ access Private

router.post('/', auth,
async  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { birth, zip, country, city, gender, height, weight, ethnicityandrace, industry, area, jobtitle} = req.body;

 // Build profile object
 const profileFields = {};
 profileFields.user = req.user.id;
    if (birth) profileFields.birth = birth;
    if (country) profileFields.country = country;
    if (zip) profileFields.zip = zip;
    if (city) profileFields.city = city;
    if (gender) profileFields.gender = gender;
    if (height) profileFields.height = height;
    if (weight) profileFields.weight = weight;
    if (ethnicityandrace) profileFields.ethnicityandrace = ethnicityandrace;
    if (industry) profileFields.industry = industry;
    if (area) profileFields.area = area;
    if (jobtitle) profileFields.jobtitle = jobtitle;

    try {
      let profile = await Profile.findOne(
        { user: req.user.id });
      if(profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);


    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

// @ route Get api/Profile
// @desc Get all user profile
// @ access Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// @ route Get api/Profile/user/:user_id
// @desc Get profile by user id
// @ access Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
    if(!profile) return res.status(400).json({ msg: 'Profile not found'});
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});

// @ DELETE api/profile
// @ desc Delete profile, users & posts
// @ access Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove users posts

    // Remove profile
    await Profile.findOneAndRemove({user: req.user.id});
    // Remove user
    await User.findOneAndRemove({_id: req.user.id});
    res.json({msg: 'User deleted'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
