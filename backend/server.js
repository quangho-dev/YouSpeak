import path from 'path'
import express from 'express'
import axios from 'axios'
import request from 'request'
import morgan from 'morgan'
import mongoose from 'mongoose'
import consola from 'consola'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import uploadVideoRoutes from './routes/uploadVideoRoutes.js'
import uploadExpImagesRoutes from './routes/uploadExpImagesRoutes.js'
import profileTeacherRoutes from './routes/profileTeacherRoutes.js'
import uploadDegreeImagesRoutes from './routes/uploadDegreeImagesRoutes.js'
import uploadTeacherAvatarRoutes from './routes/uploadTeacherAvatarRoutes.js'
import config from 'config'
import teacherRoutes from './routes/teacherRoutes.js'
import { passportMiddleware } from './middleware/passport.js'
import passport from 'passport'
import forgotPasswordRoute from './routes/forgotPasswordRoute.js'
import resetPasswordRoute from './routes/resetPasswordRoute.js'
import uploadLessonDocumentsRoute from './routes/uploadLessonDocumentsRoute.js'
import bookingCalendarTeacherRoutes from './routes/bookingCalendarTeacherRoutes.js'
import bookingCalendarStudentRoutes from './routes/bookingCalendarStudentRoutes.js'
import sendContactUsEmail from './routes/contactUsRoute.js'
import vnpayRoutes from './routes/vnpayRoutes.js'
import momoRoutes from './routes/momoRoutes.js'
import nganluongRoutes from './routes/nganluongRoutes.js'
import cors from 'cors'

const mongoURI = config.get('mongoURI')
const { connect } = mongoose
const { success, error } = consola

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

app.use(passport.initialize())

passportMiddleware(passport)

app.use('/api/users', userRoutes)

app.use('/api/forgot', forgotPasswordRoute)

app.use('/api/reset', resetPasswordRoute)

app.use('/api/contact-us', sendContactUsEmail)

app.use('/api/teachers', teacherRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/upload', uploadRoutes)
app.use('/api/upload-teacher-avatar', uploadTeacherAvatarRoutes)
app.use('/api/uploadVideo', uploadVideoRoutes)
app.use('/api/uploadDegreeImages', uploadDegreeImagesRoutes)
app.use('/api/uploadExpImages', uploadExpImagesRoutes)
app.use('/api/upload-lesson-documents', uploadLessonDocumentsRoute)
app.use('/api/booking-calendar-teacher', bookingCalendarTeacherRoutes)

app.use('/api/profile', profileRoutes)

app.use('/api/profileTeacher', profileTeacherRoutes)

app.use('/api/booking-calendar-student', bookingCalendarStudentRoutes)

// Vnpay payment method
app.use('/api/vnpay', vnpayRoutes)

// Momo payment method
app.use('/api/momo', momoRoutes)

// Ngan Luong payment method method
app.use('/api/nganluong', nganluongRoutes)

// Set up paypal payment
const CLIENT =
  'ASq1mi_XTOVgTfc0L_lJSuw0WBvpij_Gc9R99dFlRNEDuDJSzgYxv5AUmvnXiGSuqnp2VxlSUVrJkSWm'
const SECRET =
  'EHvNfMZe9s06Xjfub6TBsuax_e0fSNAiV7mkr8qjCjblgkyzZAvpZbfpNnBMmVxubO00sXHZ9JwRIob6'
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'

app.post('/create-payment', async (req, res) => {
  request.post(
    PAYPAL_API + '/v1/payments/payment',
    {
      auth: {
        user: CLIENT,
        pass: SECRET,
      },
      body: {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              total: '5.99',
              currency: 'USD',
            },
          },
        ],
        redirect_urls: {
          return_url: 'https://example.com',
          cancel_url: 'https://example.com',
        },
      },
      json: true,
    },
    function (err, response) {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      // 3. Return the payment ID to the client
      res.json({
        id: response.body.id,
      })
    }
  )
})

app.post('/execute-payment/', async (req, res) => {
  // 2. Get the payment ID and the payer ID from the request body.
  console.log(req.body)
  var paymentID = req.body.paymentID
  var payerID = req.body.payerID
  // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
  request.post(
    PAYPAL_API + '/v1/payments/payment/' + paymentID + '/execute',
    {
      auth: {
        user: CLIENT,
        pass: SECRET,
      },
      body: {
        payer_id: payerID,
        transactions: [
          {
            amount: {
              total: '10.99',
              currency: 'USD',
            },
          },
        ],
      },
      json: true,
    },
    function (err, response) {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      // 4. Return a success response to the client
      res.json({
        status: 'success',
      })
    }
  )
})

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

const PORT = process.env.PORT || 5000

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

const startApp = async () => {
  try {
    // Connection With DB
    await connect(mongoURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    success({
      message: `Successfully connected with the Database \n${mongoURI}`,
      badge: true,
    })

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    )
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    })
    startApp()
  }
}

startApp()
