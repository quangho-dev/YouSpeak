const express = require('express')
const forgotPassword = require('../../controllers/forgotPasswordController')

const router = express.Router()

router.post('/', forgotPassword)

module.exports = router
