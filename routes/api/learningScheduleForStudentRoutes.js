const express = require('express')
const router = express.Router()
const { userAuth } = require('../../utils/authPassport')
const {
  bookTime,
  cancelBookedLesson,
  getBookedLessons,
  getBookedLessonById,
} = require('../../controllers/learningScheduleForStudentController')
const checkObjectId = require('../../middleware/checkObjectId')
const { check } = require('express-validator')

router.post(
  '/',
  userAuth,
  check('duration', 'Duration is required'),
  check('price', 'Price is required'),
  check('bookedTime', 'BookedTime is required'),
  check('teacher', 'Teacher is required'),
  check('lesson', 'Lesson is required'),
  bookTime
)

router.delete(
  '/cancel-booked-lesson/:bookedTimeId',
  checkObjectId('bookedTimeId'),
  userAuth,
  cancelBookedLesson
)

router.get('/bookedLessons', userAuth, getBookedLessons)

router.get(
  '/:bookedLessonId',
  checkObjectId('bookedLessonId'),
  userAuth,
  getBookedLessonById
)

module.exports = router
