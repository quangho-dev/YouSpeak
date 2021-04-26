import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import { getUserByToken } from '../controllers/authController.js'
import { check } from 'express-validator'
import authRole from '../middleware/authRole.js'
import { userAuth } from '../utils/authPassport.js'

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', userAuth, getUserByToken)

export default router
