const express = require('express')
const router = express.Router()
const { userAuth } = require('../../utils/authPassport')
const {
  setAvailableTime,
  getAvailableTime,
  getAvailableTimeOfATeacher,
  confirmBookedLesson,
  cancelBookedLesson,
} = require('../../controllers/bookingCalendarTeacherController')
const checkObjectId = require('../../middleware/checkObjectId')

router.post('/', userAuth, setAvailableTime)

router.get('/me', userAuth, getAvailableTime)

router.get(
  '/:teacherCalendarId',
  checkObjectId('teacherCalendarId'),
  userAuth,
  getAvailableTimeOfATeacher
)

router.put(
  '/:bookedLessonId',
  checkObjectId('bookedLessonId'),
  userAuth,
  confirmBookedLesson
)

router.delete(
  '/:bookedLessonId',
  checkObjectId('bookedLessonId'),
  userAuth,
  cancelBookedLesson
)

module.exports = router
