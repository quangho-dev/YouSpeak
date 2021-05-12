const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const ProfileTeacher = require('../models/profileTeacherModel')
const { validationResult } = require('express-validator')
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const TypeOfLesson = require('../models/TypeOfLesson')
const LearningScheduleForStudent = require('../models/LearningScheduleForStudent')

// @desc    Register a new teacher
// @route   POST /api/teachers/register-teacher
// @access  Public
const registerTeacher = async (req, role, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Tài khoản giáo viên này đã tồn tại.' }] })
    }

    user = new User({
      name,
      email,
      role,
      password,
      isVerified: true,
    })

    await user.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message })
      }
    })

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err
        res.status(200).json({
          token,
          msg: 'Bạn đã đăng ký tài khoản thành công!',
        })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ errors: [{ msg: 'Server error' }] })
  }
}

// @route    POST api/teachers/login-teacher
// @desc     Login teacher and get token
// @access   Public
const loginTeacher = async (req, role, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Thông tin đăng nhập không đúng.' }] })
    }

    if (user.role !== role) {
      return res.status(403).json({
        errors: [
          {
            msg: 'Bạn vui lòng đăng nhập đúng cổng.',
          },
        ],
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Mật khẩu không trùng khớp.' }] })
    }

    if (!user.isVerified) {
      return res.status(401).send({
        errors: [
          {
            type: 'not-verified',
            msg: 'Tài khoản của bạn chưa được kích hoạt.',
          },
        ],
      })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// @route    GET api/teachers/confirmation/:token
// @desc     Verify account
// @access   Public
const confirmationGet = async (req, res, next) => {
  Token.findOne({ token: req.params.token }, function (err, token) {
    if (!token)
      return res.status(400).send({
        errors: [
          {
            type: 'not-verified',
            msg: 'Link kích hoạt tài khoản của bạn đã hết hạn sử dụng.',
          },
        ],
      })

    User.findOne({ _id: token._userId }, function (err, user) {
      if (!user)
        return res.status(400).send({
          errors: [
            {
              msg: 'Không tìm được tài khoản người dùng này để kích hoạt.',
            },
          ],
        })
      if (user.isVerified)
        return res.status(400).send({
          errors: [
            {
              type: 'already-verified',
              msg: 'Tài khoản này đã được kích hoạt.',
            },
          ],
        })

      user.isVerified = true
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ errors: [{ msg: err.message }] })
        }

        res.status(200).redirect('http://localhost:3000/teachers/login')
      })
    })
  })
}

// @route    POST api/teachers/resend-confirmation-token
// @desc     Resend confirmation token
// @access   Public
const resendTokenPost = async (req, res, next) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      return res.status(400).send({
        errors: [
          { msg: 'Không thể tìm được tài khoản người dùng với email này.' },
        ],
      })
    }

    if (user.isVerified) {
      return res.status(400).send({
        errors: [
          { msg: 'Tài khoản này đã được kích hoạt, bạn vui lòng đăng nhập.' },
        ],
      })
    }

    const token = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    })

    token.save(function (err) {
      if (err) {
        return res.status(500).send({ errors: [{ msg: err.message }] })
      }
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: 'quang.ho1804@gmail.com', pass: 'un1c0rn1234' },
    })
    const mailOptions = {
      from: 'no-reply@youspeak.com',
      to: user.email,
      subject: 'Kích hoạt tài khoản.',
      html: `<p>Xin chào,</p><p>Hãy kích hoạt tài khoản của bạn bằng cách nhấp chuột vào <a href='http://localhost:5000/api/teachers/confirmation/${token.token}'>đường link này.</a></p>`,
    }
    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        return res.status(500).send({ errors: [{ msg: err.message }] })
      }

      res.status(200).json({
        msg:
          'Một email dùng để kích hoạt tài khoản đã được gửi vào ' +
          user.email +
          '.',
      })
    })
  })
}

// @route    GET api/teachers/english
// @desc     Get all teachers
// @access   Private
const getTeachers = async (req, res) => {
  try {
    const teachers = await ProfileTeacher.find()
      .populate('user', ['name'])
      .populate('lessons', ['periods'])
    res.json(teachers)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

// @route    POST api/teachers/lessons/create-or-update-a-lesson/:id
// @desc     Create or update teacher's lessons
// @access   Private/teachers
const createOrUpdateALesson = async (req, res) => {
  const { lessonName, content, periods, documents, ...rest } = req.body

  const lessonFields = {
    user: req.user.id,
    lessonName,
    content,
    periods,
    documents,
    ...rest,
  }

  try {
    let typeOfLesson = await TypeOfLesson.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: lessonFields },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    )
    return res.json(typeOfLesson)
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
}

// @route    GET api/teachers/lessons/me
// @desc     Get all lessons
// @access   Private/teachers
const getLessons = async (req, res) => {
  try {
    const typesOfLesson = await TypeOfLesson.find({
      user: req.user.id,
    }).populate('user', ['name'])
    res.json(typesOfLesson)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/teachers/lessons/:id
// @desc     Get lesson by ID
// @access   Private/teachers
const getLessonById = async (req, res) => {
  try {
    const typeOfLesson = await TypeOfLesson.findById(req.params.id)

    if (!typeOfLesson) {
      return res.status(404).json({ msg: 'Không tìm thấy bài học này.' })
    }

    res.json(typeOfLesson)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

// @route    DELETE api/teachers/lessons/:id
// @desc     Delete a lesson by ID
// @access   Private/teachers
const deleteLessonByID = async (req, res) => {
  try {
    const typeOfLesson = await TypeOfLesson.findById(req.params.id)

    if (!typeOfLesson) {
      return res.status(404).json({ msg: 'Không tìm thấy bài học' })
    }

    // Check user
    if (typeOfLesson.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    // remove this lesson from current lesson array in profile teacher
    const profileTeacher = await ProfileTeacher.find({ user: req.user.id })

    // const filteredLessonArray = profileTeacher[0].lessons.filter(
    //   (item) => item !== req.params.id
    // )

    const index = profileTeacher[0].lessons.indexOf(req.params.id)
    if (index > -1) {
      profileTeacher[0].lessons.splice(index, 1)
    }

    // profileTeacher[0].lessons = filteredLessonArray

    await profileTeacher[0].save()

    await typeOfLesson.remove()

    res.json({ msg: 'Đã xóa bài học.' })
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

// @route    POST api/teachers/lessons
// @desc     Create a lesson
// @access   Private/teachers
const createALesson = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')

    const { lessonName, content, periods, documents } = req.body

    const newTypeOfLesson = new TypeOfLesson({
      user: req.user.id,
      lessonName,
      content,
      periods,
      documents,
    })

    const lesson = await newTypeOfLesson.save()

    // push new lesson to teacher's profile
    const profileTeacher = await ProfileTeacher.find({ user: req.user.id })

    profileTeacher[0].lessons.push(lesson._id)

    await profileTeacher[0].save()

    res.json(lesson)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/teachers/:teacherId/lessons
// @desc     Get all lessons of a teacher by id
// @access   Private/teachers
const getLessonsOfTeacherById = async (req, res) => {
  try {
    const typesOfLesson = await TypeOfLesson.find({
      user: req.params.teacherId,
    })

    if (!typesOfLesson) {
      return res
        .status(400)
        .json({ msg: 'Không tìm thấy bài học của giáo viên này.' })
    }

    res.json(typesOfLesson)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route  GET api/teachers/:teacherId/bookedLessons
// @desc     Get all booked lessons of a teacher
// @access   Private/teachers
const getBookedLessonsOfATeacher = async (req, res) => {
  try {
    const bookedLessons = await LearningScheduleForStudent.find({
      teacher: req.params.teacherId,
    })
      .populate('user', ['name'])
      .populate('lesson', ['lessonName'])

    if (!bookedLessons) {
      return res
        .status(400)
        .json({ msg: 'Không tìm thấy bài học đã đặt của giáo viên này.' })
    }

    res.json(bookedLessons)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

module.exports = {
  registerTeacher,
  loginTeacher,
  confirmationGet,
  resendTokenPost,
  getTeachers,
  createOrUpdateALesson,
  getLessons,
  getLessonById,
  deleteLessonByID,
  createALesson,
  getLessonsOfTeacherById,
  getBookedLessonsOfATeacher,
}
