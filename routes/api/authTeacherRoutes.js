const express = require('express')
const router = express.Router()
const authTeachers = require('../api/middleware/authTeachers')
const {
  authTeacher,
  getTeacherByToken,
} = require('../api/controllers/authTeacherController')
const { check } = require('express-validator')

router
  .route('/')
  .get(authTeachers, getTeacherByToken)
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    authTeacher
  )

module.exports = router
