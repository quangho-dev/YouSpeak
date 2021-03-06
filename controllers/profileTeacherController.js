const ProfileTeacher = require('../models/profileTeacherModel')
const TypeOfLesson = require('../models/TypeOfLesson')

// @route    GET api/profileTeacher/me
// @desc     Get current teacher profile
// @access   Private
const getCurrentProfileTeacher = async (req, res) => {
  try {
    const profileTeacher = await ProfileTeacher.findOne({
      user: req.user.id,
    }).populate('user', ['name'])

    if (!profileTeacher) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this teacher' })
    }

    res.json(profileTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    POST api/profileTeacher
// @desc     Create or update teacher profile
// @access   Private
const createOrUpdateProfileTeacher = async (req, res) => {
  try {
    const typeOfLessonArray = await TypeOfLesson.find({ user: req.user.id })

    const objectIdLessonsArray = typeOfLessonArray.map((lesson) => lesson._id)

    const {
      typeOfTeacher,
      degreeImages,
      teacherAvatar,
      dateOfBirth,
      hometown,
      skypeId,
      introduction,
      video,
      expImages,
      thumbnail,
      videoDuration,
      phoneNumber,
      nameOnCard,
      bankName,
      cardNumber,
    } = req.body

    const profileTeacherFields = {
      user: req.user.id,
      typeOfTeacher,
      degreeImages,
      teacherAvatar,
      dateOfBirth,
      hometown,
      skypeId,
      introduction,
      video,
      expImages,
      thumbnail,
      videoDuration,
      phoneNumber,
      lessons: objectIdLessonsArray,
      nameOnCard,
      bankName,
      cardNumber,
    }

    // Using upsert option (creates new doc if no match is found):
    let profileTeacher = await ProfileTeacher.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileTeacherFields },
      { new: true, upsert: true }
    )

    res.json(profileTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/profileTeacher/:teacherId
// @desc     Get teacher by id
// @access   Private
const getProfileTeacherById = async (req, res) => {
  try {
    const profileTeacher = await ProfileTeacher.findOne({
      user: req.params.teacherId,
    })
      .populate('user', ['name', 'email'])
      .populate('lessons', ['periods', 'lessonName'])

    if (!profileTeacher) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this teacher' })
    }

    res.json(profileTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
  getProfileTeacherById,
}
