const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const md5 = require('md5')
const buildUrl = require('build-url')
const sendEmail = require('../../utils/sendEmail')
const NotYetPaidOrder = require('../../models/NotYetPaidOrder')
const { userAuth } = require('../../utils/authPassport')
const LearningScheduleForStudent = require('../../models/LearningScheduleForStudent')
const TeachingScheduleForTeacher = require('../../models/TeachingScheduleForTeacher')
const User = require('../../models/userModel')

router.post('/create-payment', userAuth, async (req, res) => {
  // Create new notYetPaidOrder document
  try {
    const newNotYetPaidOrder = new NotYetPaidOrder({
      student: req.user.id,
      bookedTimeIntervals: req.body.bookedTime,
      teacher: req.body.teacher,
      lesson: req.body.lesson,
      duration: req.body.duration,
      price: req.body.price,
    })

    const notYetPaidOrder = await newNotYetPaidOrder.save()

    // Create nganluong payment url
    const merchant_site_code = '50215'
    const return_url = 'http://localhost:3000/nganluong-payment/success'
    const cancel_url = ''
    const notify_url = 'https://e40c8ccc8d0a.ngrok.io/api/nganluong-payment/ipn'
    const receiver = 'quang.ho1804@gmail.com'
    const transaction_info = 'Thanh toan bai hoc'
    const price = req.body.price
    const order_code = notYetPaidOrder._id
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

    res.status(200).json({ nganluongUrl })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

router.get('/ipn', async (req, res) => {
  console.log('IPN activated!')

  const transaction_info = req.query.transaction_info
  const order_code = req.query.order_code
  const payment_id = req.query.payment_id
  const payment_type = req.query.payment_type
  const error_text = req.query.error_text
  const merchant_site_code = req.query.merchant_site_code
  const secure_code = req.query.secure_code
  const price = req.query.price

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

  try {
    // Get corresponding notPaidYetOrder data
    const notYetPaidOrder = await NotYetPaidOrder.findById(order_code)

    if (!notYetPaidOrder) {
      console.error('Can not find the corresponding notYetPaidOrder')
    }

    const { student, teacher, bookedTimeIntervals, duration, lesson, price } =
      notYetPaidOrder

    const newBookedTime = new LearningScheduleForStudent({
      user: student,
      bookedTime: bookedTimeIntervals,
      teacher,
      duration,
      lesson,
      price,
    })

    const bookedTimeData = await newBookedTime.save()

    // send a notification email to the teacher
    const teacherInfo = await User.findById(bookedTimeData.teacher)

    sendEmail({
      htmlOutput: `<p>You have received a new order for a lesson</p>
  <p>Please click <a href='http://localhost:3000/teachers/bookedLesson/${bookedTimeData._id}'>this link</a> to confirm that you can deliver the lesson on time.</p>`,
      to: teacherInfo.email,
      from: 'YouSpeak <quang.ho1804@gmail.com>',
      subject: "You've got a new order",
    })

    // Remove booked time intervals from teacher's available time
    const teacherAvailableTime = await TeachingScheduleForTeacher.findOne({
      user: teacher,
    })

    const availableTime = teacherAvailableTime.availableTime

    if (duration === 1800000) {
      const filteredAvailTimeArray = availableTime.filter(
        (item) =>
          new Date(item.start).getTime() !==
          new Date(bookedTimeIntervals[0].start).getTime()
      )

      teacherAvailableTime.availableTime = filteredAvailTimeArray

      await teacherAvailableTime.save()

      return 1
    } else if (duration === 2700000 || duration === 3600000) {
      const filteredAvailTimeArray = availableTime.filter(
        (item) =>
          new Date(item.start).getTime() !==
          new Date(bookedTimeIntervals[0].start).getTime()
      )

      const secondfilterdAvailTimeArray = filteredAvailTimeArray.filter(
        (item) =>
          new Date(item.start).getTime() !==
          new Date(bookedTimeIntervals[1].start).getTime()
      )

      teacherAvailableTime.availableTime = secondfilterdAvailTimeArray

      await teacherAvailableTime.save()

      return 1
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
