const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const md5 = require('md5')
const buildUrl = require('build-url')

router.post('/create-payment', async (req, res) => {
  const merchant_site_code = '50215'
  const return_url = 'http://localhost:3000/nganluong-payment/success'
  const cancel_url = ''
  const notify_url = 'https://77aee87b4fd6.ngrok.io/api/nganluong-payment/ipn'
  const receiver = 'quang.ho1804@gmail.com'
  const transaction_info = ''
  const order_code = uuidv4()
  const price = 50000
  const currency = 'vnd'
  const quantity = 1
  const tax = 0
  const discount = 0
  const fee_cal = 0
  const fee_shipping = 0
  const buyer_info = ''
  const affiliate_code = ''
  const lang = ''
  const time_limit = ''
  const secure_pass = 'a5eef1880a3dd585e4a38e6383c8e506'
  const order_description = 'thanh toan bang ngan luong'
  const secure_code = md5(
    merchant_site_code +
      ' ' +
      return_url +
      ' ' +
      receiver +
      ' ' +
      transaction_info +
      ' ' +
      order_code +
      ' ' +
      price +
      ' ' +
      currency +
      ' ' +
      quantity +
      ' ' +
      tax +
      ' ' +
      discount +
      ' ' +
      fee_cal +
      ' ' +
      fee_shipping +
      ' ' +
      order_description +
      ' ' +
      buyer_info +
      ' ' +
      affiliate_code +
      ' ' +
      secure_pass
  )

  const nganluongUrl = buildUrl(
    'https://sandbox.nganluong.vn:8088/nl35/checkout.php',
    {
      queryParams: {
        merchant_site_code,
        return_url,
        receiver,
        transaction_info,
        order_code,
        price,
        currency,
        quantity,
        tax,
        discount,
        fee_cal,
        order_description,
        buyer_info,
        affiliate_code,
        lang,
        secure_code,
        cancel_url,
        notify_url,
        time_limit,
      },
    }
  )

  console.log('nganluongUrl', nganluongUrl)
})

router.get('/ipn', async (req, res) => {
  const arrayInfo = req.query.transaction_info.split(' ')

  const transaction_info = req.query.transaction_info
  const order_code = req.query.order_code
  const payment_id = req.query.payment_id
  const payment_type = req.query.payment_type
  const error_text = req.query.error_text
  const merchant_site_code = req.query.merchant_site_code
  const secure_code = req.query.secure_code

  const lesson = arrayInfo[0]
  const teacher = arrayInfo[1]
  const duration = arrayInfo[2]
  const bookedTime = arrayInfo[3]
  const price = req.query.price
  const user = arrayInfo[4]

  const verify_secure_code =
    ' ' +
    transaction_info +
    ' ' +
    order_code +
    ' ' +
    price +
    ' ' +
    payment_id +
    ' ' +
    payment_type +
    ' ' +
    error_text +
    ' ' +
    merchant_site_code +
    ' ' +
    'a5eef1880a3dd585e4a38e6383c8e506'

  const checkSum = md5(verify_secure_code)

  if (checkSum === secure_code) {
    try {
      const newBookedTime = new LearningScheduleForStudent({
        user,
        bookedTime,
        teacher,
        duration,
        lesson,
        price,
      })

      const bookedTimeData = await newBookedTime.save()

      // send a notification email to the teacher
      const teacherInfo = await User.findById(bookedTimeData.teacher)

      const output = `<p>You have received a new order for a lesson</p>
  <p>Please click <a href='http://localhost:3000/teachers/bookedLesson/${bookedTimeData._id}'>this link</a> to confirm that you can deliver the lesson on time.</p>`

      const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'quang.ho1804@gmail.com',
          pass: 'Un1c0rn!1234',
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      const mailOptions = {
        to: teacherInfo.email,
        from: 'YouSpeak <quang.ho1804@gmail.com>',
        subject: "You've got a new order",
        html: output,
      }

      smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
      })

      const teacherAvailableTime = await TeachingScheduleForTeacher.findOne({
        user: teacher,
      })

      const availableTime = teacherAvailableTime.availableTime

      if (duration === 1800000) {
        const filteredAvailTimeArray = availableTime.filter(
          (item) =>
            new Date(item.start).getTime() !==
            new Date(bookedTime.start).getTime()
        )

        teacherAvailableTime.availableTime = filteredAvailTimeArray

        await teacherAvailableTime.save()

        res.json(bookedTimeData)
      } else if (duration === 2700000 || duration === 3600000) {
        const filteredAvailTimeArray = availableTime.filter(
          (item) =>
            new Date(item.start).getTime() !==
            new Date(bookedTime[0].start).getTime()
        )

        const secondfilterdAvailTimeArray = filteredAvailTimeArray.filter(
          (item) =>
            new Date(item.start).getTime() !==
            new Date(bookedTime[1].start).getTime()
        )

        teacherAvailableTime.availableTime = secondfilterdAvailTimeArray

        await teacherAvailableTime.save()

        res.send(1)
      }
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  }
})

module.exports = router
