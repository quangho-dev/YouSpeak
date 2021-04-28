const express = require('express')
const sendContactUsEmail = require('../../controllers/contactUsController')

const router = express.Router()

router.post('/', sendContactUsEmail)

module.exports = router
