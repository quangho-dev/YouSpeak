const path = require('path')
const express = require('express')
const request = require('request')
const morgan = require('morgan')
const uploadRoutes = require('./routes/api/uploadRoutes')
const userRoutes = require('./routes/api/userRoutes')
const authRoutes = require('./routes/api/authRoutes')
const profileRoutes = require('./routes/api/profileRoutes')
const uploadVideoRoutes = require('./routes/api/uploadVideoRoutes')
const uploadExpImagesRoutes = require('./routes/api/uploadExpImagesRoutes')
const profileTeacherRoutes = require('./routes/api/profileTeacherRoutes')
const uploadDegreeImagesRoutes = require('./routes/api/uploadDegreeImagesRoutes')
const uploadTeacherAvatarRoutes = require('./routes/api/uploadTeacherAvatarRoutes')
const teacherRoutes = require('./routes/api/teacherRoutes')
const { passportMiddleware } = require('./middleware/passport')
const passport = require('passport')
const forgotPasswordRoute = require('./routes/api/forgotPasswordRoute')
const resetPasswordRoute = require('./routes/api/resetPasswordRoute')
const uploadLessonDocumentsRoute = require('./routes/api/uploadLessonDocumentsRoute')
const bookingCalendarTeacherRoutes = require('./routes/api/bookingCalendarTeacherRoutes')
const bookingCalendarStudentRoutes = require('./routes/api/bookingCalendarStudentRoutes')
const sendContactUsEmail = require('./routes/api/contactUsRoute')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express()

// connect database
connectDB()

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

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
