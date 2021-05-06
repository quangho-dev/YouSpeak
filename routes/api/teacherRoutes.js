const express = require('express')
const router = express.Router()
const {
  loginTeacher,
  registerTeacher,
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
} = require('../../controllers/teacherController')

const { check } = require('express-validator')
const { userAuth } = require('../../utils/authPassport')
const checkObjectId = require('../../middleware/checkObjectId')

router
  .route('/login-teacher')
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      await loginTeacher(req, 'teacher', res)
    }
  )

router.post(
  '/register-teacher',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    await registerTeacher(req, 'teacher', res)
  }
)

router.get('/confirmation/:token', confirmationGet)

router.post('/resend-confirmation-token', resendTokenPost)

router.get('/english', userAuth, getTeachers)

router.post(
  '/lessons/create-or-update-a-lesson/:id',
  userAuth,
  checkObjectId('id'),
  createOrUpdateALesson
)

router.get('/lessons/me', userAuth, getLessons)

router.get('/lessons/:id', userAuth, checkObjectId('id'), getLessonById)

router.delete('/lessons/:id', userAuth, checkObjectId('id'), deleteLessonByID)

router.post('/lessons', userAuth, createALesson)

router.get(
  '/:teacherId/bookedLessons',
  userAuth,
  checkObjectId('teacherId'),
  getBookedLessonsOfATeacher
)

router.get(
  '/:teacherId/lessons',
  userAuth,
  checkObjectId('teacherId'),
  getLessonsOfTeacherById
)

module.exports = router
