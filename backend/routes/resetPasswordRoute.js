import express from 'express'
import {
  resetPassword,
  createResetPassword,
} from '../controllers/resetPasswordController.js'

const router = express.Router()

router.get('/:token', resetPassword)

router.post('/:token', createResetPassword)

export default router
