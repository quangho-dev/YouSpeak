import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
  getProfileTeacherById,
} from '../controllers/profileTeacherController.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.get('/me', userAuth, getCurrentProfileTeacher)
router.post('/', userAuth, createOrUpdateProfileTeacher)
router.get(
  '/:teacherId',
  checkObjectId('teacherId'),
  userAuth,
  getProfileTeacherById
)

export default router
