const express = require('express')
const router = express.Router()
const { getUserByToken } = require('../../controllers/authController')
const { userAuth } = require('../../utils/authPassport')

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', userAuth, getUserByToken)

module.exports = router
