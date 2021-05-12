const express = require('express')
const router = express.Router()
const {
  getCurrentProfile,
  createOrUpdateProfile,
  getProfileStudentById,
} = require('../../controllers/profileStudentController')
const { userAuth } = require('../../utils/authPassport')
const checkObjectId = require('../../middleware/checkObjectId')

router.get('/me', userAuth, getCurrentProfile)
router.post('/', userAuth, createOrUpdateProfile)
router.get(
  '/:studentId',
  checkObjectId('studentId'),
  userAuth,
  getProfileStudentById
)

module.exports = router
