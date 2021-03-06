const path = require('path')
const express = require('express')
const request = require('request')
const morgan = require('morgan')
const uploadRoutes = require('./routes/api/uploadRoutes')
const userRoutes = require('./routes/api/userRoutes')
const authRoutes = require('./routes/api/authRoutes')
const profileStudentRoutes = require('./routes/api/profileStudentRoutes')
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
const teachingScheduleForTeacherRoutes = require('./routes/api/teachingScheduleForTeacherRoutes')
const learningScheduleForStudentRoutes = require('./routes/api/learningScheduleForStudentRoutes')
const sendContactUsEmail = require('./routes/api/contactUsRoute')
const cors = require('cors')
const config = require('config')
const connectDB = require('./config/db')
const momoPaymentRoutes = require('./routes/api/momoPaymentRoutes')
const vnpayRoutes = require('./routes/api/vnpayRoutes')
const nganluongPaymentRoutes = require('./routes/api/nganluongPaymentRoutes')
const bodyParser = require('body-parser')

const app = express()

// connect database
connectDB()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

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
app.use('/api/teaching-schedule-for-teacher', teachingScheduleForTeacherRoutes)

app.use('/api/profileStudent', profileStudentRoutes)

app.use('/api/profileTeacher', profileTeacherRoutes)

app.use('/api/learning-schedule-for-student', learningScheduleForStudentRoutes)

app.use('/api/reviews', require('./routes/api/reviews'))

// Set up paypal payment
const CLIENT_PAYPAL = config.get('CLIENT_PAYPAL')
const SECRET_PAYPAL = config.get('SECRET_PAYPAL')
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'

app.post('/create-payment', async (req, res) => {
  request.post(
    PAYPAL_API + '/v1/payments/payment',
    {
      auth: {
        user: process.env.CLIENT_PAYPAL || CLIENT_PAYPAL,
        pass: process.env.SECRET_PAYPAL || SECRET_PAYPAL,
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
        user: process.env.CLIENT_PAYPAL || CLIENT_PAYPAL,
        pass: process.env.SECRET_PAYPAL || SECRET_PAYPAL,
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

app.use('/api/nganluong-payment', nganluongPaymentRoutes)

// Momo payment setup
app.use('/api/momo-payment', momoPaymentRoutes)

app.use('/api/vnpay', vnpayRoutes)

app.use('/api/zaloPayment', require('./routes/api/zaloPayment'))

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
  const error = new Error('Can not find that route!')
  error.status = 404
  next(error)
})

const PORT = config.get('PORT')

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server started on port ${PORT}`)
)
