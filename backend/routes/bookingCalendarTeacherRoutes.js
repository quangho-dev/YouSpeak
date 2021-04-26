import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import {
  setAvailableTime,
  getAvailableTime,
  getAvailableTimeOfATeacher,
  confirmBookedLesson,
  cancelBookedLesson,
} from '../controllers/bookingCalendarTeacherController.js'
import checkObjectId from '../middleware/checkObjectId.js'

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

export default router
