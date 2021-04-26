import Teacher from '../models/teacherModel.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'

// @route    GET api/authTeacher
// @desc     Get teacher by token
// @access   Private
const getTeacherByToken = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select('-password')
    res.json(teacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    POST api/authTeacher
// @desc     Authenticate teacher & get token
// @access   Public
const authTeacher = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let teacher = await Teacher.findOne({ email })

    if (!teacher) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const isMatch = await bcrypt.compare(password, teacher.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const payload = {
      teacher: {
        id: teacher.id,
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

export { authTeacher, getTeacherByToken }
