import express from 'express'
const router = express.Router()
import {
  getCurrentProfile,
  createOrUpdateProfile,
  getProfileStudentById,
} from '../controllers/profileController.js'
import { userAuth } from '../utils/authPassport.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.get('/me', userAuth, getCurrentProfile)
router.post('/', userAuth, createOrUpdateProfile)
router.get(
  '/:studentId',
  checkObjectId('studentId'),
  userAuth,
  getProfileStudentById
)

export default router
