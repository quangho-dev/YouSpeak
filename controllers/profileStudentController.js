const ProfileStudent = require('../models/ProfileStudent')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const getCurrentProfile = async (req, res) => {
  try {
    const profileStudent = await ProfileStudent.findOne({
      user: req.user.id,
    }).populate('user', ['name'])

    if (!profileStudent) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profileStudent)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
const createOrUpdateProfile = async (req, res) => {
  const {
    address,
    imageAvatar,
    dateOfBirth,
    gender,
    englishLevel,
    skypeId,
    introduction,
    phoneNumber,
  } = req.body

  const profileFields = {
    user: req.user.id,
    address,
    imageAvatar,
    dateOfBirth,
    gender,
    englishLevel,
    skypeId,
    introduction,
    phoneNumber,
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let profileStudent = await ProfileStudent.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    )

    res.json(profileStudent)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/profile/:studentId
// @desc     Get profile student by id
// @access   Private
const getProfileStudentById = async (req, res) => {
  try {
    const profileStudent = await ProfileStudent.findOne({
      user: req.params.studentId,
    })

    if (!profileStudent) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this student' })
    }

    res.json(profileStudent)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  getCurrentProfile,
  createOrUpdateProfile,
  getProfileStudentById,
}
