import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import {
  bookTime,
  cancelBookedLesson,
  getBookedLessons,
  getBookedLessonById,
} from '../controllers/bookingCalendarStudentController.js'
import checkObjectId from '../middleware/checkObjectId.js'

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

export default router
