const express = require('express')
const {
  resetPassword,
  createResetPassword,
} = require('../../controllers/resetPasswordController')

const router = express.Router()

router.get('/:token', resetPassword)

router.post('/:token', createResetPassword)

module.exports = router
