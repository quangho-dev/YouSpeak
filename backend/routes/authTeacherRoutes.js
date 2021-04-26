import express from 'express'
const router = express.Router()
import authTeachers from '../middleware/authTeachers.js'
import {
  authTeacher,
  getTeacherByToken,
} from '../controllers/authTeacherController.js'
import { check } from 'express-validator'

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

export default router
