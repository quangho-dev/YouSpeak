import User from '../models/userModel.js'
import Token from '../models/tokenModel.js'
import ProfileTeacher from '../models/profileTeacherModel.js'
import { validationResult } from 'express-validator'
import config from 'config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import Lesson from '../models/lessonModel.js'
import { resolveTxt } from 'dns'

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
    })

    await user.save(function (err) {
      if (err) {
        return res.status(500).send({ msg: err.message })
      }

      const token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      })

      token.save(function (err) {
        if (err) {
          return res.status(500).send({ errors: [{ msg: err.message }] })
        }

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'quang.ho1804@gmail.com',
            pass: 'un1c0rn1234',
          },
        })

        const mailOptions = {
          from: 'no-reply@youspeak.com',
          to: user.email,
          subject: 'Xác nhận tài khoản',
          html: `<p>Xin chào,</p><p>Bạn vui lòng click vào <a href='http://localhost:5000/api/teachers/confirmation/${token.token}'>đường dẫn này</a> để kích hoạt tài khoản.</p>`,
        }

        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({ errors: [{ msg: err.message }] })
          }
        })
      })
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
          msg:
            'Một email kích hoạt tài khoản đã được gửi vào ' + user.email + '.',
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
    let lesson = await Lesson.findOneAndUpdate(
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
    return res.json(lesson)
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
    const lessons = await Lesson.find({ user: req.user.id }).populate('user', [
      'name',
    ])
    res.json(lessons)
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
    const lesson = await Lesson.findById(req.params.id)

    if (!lesson) {
      return res.status(404).json({ msg: 'Không tìm thấy bài học này.' })
    }

    res.json(lesson)
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
    const lesson = await Lesson.findById(req.params.id)

    if (!lesson) {
      return res.status(404).json({ msg: 'Không tìm thấy bài học' })
    }

    // Check user
    if (lesson.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await lesson.remove()

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

    const newLesson = new Lesson({
      user: req.user.id,
      lessonName,
      content,
      periods,
      documents,
    })

    const lesson = await newLesson.save()

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
    const lessons = await Lesson.find({ user: req.params.teacherId })

    if (!lessons) {
      return res
        .status(400)
        .json({ msg: 'Không tìm thấy bài học của giáo viên này.' })
    }

    res.json(lessons)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export {
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
}
