import express from 'express'
import sendContactUsEmail from '../controllers/contactUsController.js'

const router = express.Router()

router.post('/', sendContactUsEmail)

export default router
