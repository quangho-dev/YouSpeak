import express from 'express'
const router = express.Router()
import {
  registerUser,
  loginUser,
  confirmationGet,
  resendTokenPost,
} from '../controllers/userController.js'
import { check } from 'express-validator'
import auth from '../middleware/auth.js'

// Register user
router.post(
  '/register-user',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    await registerUser(req, 'user', res)
  }
)

// Login user
router.post(
  '/login-user',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    await loginUser(req, 'user', res)
  }
)

router.get('/confirmation/:token', confirmationGet)

router.post('/resend-confirmation-token', resendTokenPost)

export default router
