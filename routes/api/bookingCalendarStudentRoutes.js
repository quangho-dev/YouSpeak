const express = require('express')
const router = express.Router()
const { userAuth } = require('../../utils/authPassport')
const {
  bookTime,
  cancelBookedLesson,
  getBookedLessons,
  getBookedLessonById,
} = require('../../controllers/bookingCalendarStudentController')
const checkObjectId = require('../../middleware/checkObjectId')

router.post('/', userAuth, bookTime)

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
