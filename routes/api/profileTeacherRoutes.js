const express = require('express')
const router = express.Router()
const { userAuth } = require('../../utils/authPassport')
const {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
  getProfileTeacherById,
} = require('../../controllers/profileTeacherController')
const checkObjectId = require('../../middleware/checkObjectId')

router.get('/me', userAuth, getCurrentProfileTeacher)
router.post('/', userAuth, createOrUpdateProfileTeacher)
router.get(
  '/:teacherId',
  checkObjectId('teacherId'),
  userAuth,
  getProfileTeacherById
)

module.exports = router
