const axios = require('axios')
const CryptoJS = require('crypto-js')
const moment = require('moment')
const LearningScheduleForStudent = require('../models/LearningScheduleForStudent')
const TeachingScheduleForTeacher = require('../models/TeachingScheduleForTeacher')
const NotYetPaidOrder = require('../models/NotYetPaidOrder')

// @desc    Create an order to send to zalo
// @route   POST /api/zaloPayment/createOrder
// @access  Private
const createOrder = async (req, res) => {
  const { bookedTime, teacher, lesson, duration, price } = req.body

  const transID = Math.floor(Math.random() * 1000000)
  let app_trans_id = `${moment().format('YYMMDD')}_${transID}` // translation missing: vi.docs.shared.sample_code.comments.app_trans_id

  // Create order url to send to zalo server
  const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
  }

  const embed_data = { redirecturl: 'http://localhost:3000/zalopay/success' }

  const items = [{}]
  const order = {
    app_id: config.app_id,
    app_trans_id,
    app_user: 'user123',
    app_time: Date.now(), // miliseconds
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: price,
    description: `Lazada - Payment for the order #${transID}`,
    bank_code: 'CC',
    callback_url: 'https://4bb164bb6cb0.ngrok.io/api/zaloPayment/ipn',
  }

  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data =
    config.app_id +
    '|' +
    order.app_trans_id +
    '|' +
    order.app_user +
    '|' +
    order.amount +
    '|' +
    order.app_time +
    '|' +
    order.embed_data +
    '|' +
    order.item
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

  const result = await axios.post(config.endpoint, null, { params: order })

  // Create a notYetPaidOrder in NotYetPaidOrder model
  try {
    const newNotYetPaidOrder = new NotYetPaidOrder({
      student: req.user.id,
      bookedTimeIntervals: bookedTime,
      teacher,
      lesson,
      duration,
      price,
      app_trans_id,
    })

    const notYetPaidOrder = await newNotYetPaidOrder.save()

    console.log('notyetPaidOrder:', notYetPaidOrder)

    res.status(200).json(result.data.order_url)
  } catch (err) {
    console.error(err.message)
  }
}

// @desc    Handle IPN callback from Zalo
// @route   GET /api/zaloPayment/ipn
// @access  Private
const handleIPNCallback = async (req, res) => {
  const config = {
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  }

  let result = {}

  try {
    let dataStr = req.body.data
    let reqMac = req.body.mac
    let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString()
    console.log('mac =', mac)

    console.log('body:', req.body)

    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      console.log('NOT EQUAL')
      // callback không hợp lệ
      result.return_code = -1
      result.return_message = 'mac not equal'
    } else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, config.key2)
      console.log(
        "update order's status = success where app_trans_id =",
        dataJson['app_trans_id']
      )

      result.return_code = 1
      result.return_message = 'success'

      // Create a new booked lesson in LearningScheduleForStudent
      const foundNotYetPaidOrder = await NotYetPaidOrder.findOne({
        app_trans_id: dataJson['app_trans_id'],
      })

      console.log('app_trans_id:', dataJson['app_trans_id'])
      console.log('foundNotYetPaidOrder:', foundNotYetPaidOrder)

      const {
        student,
        teacher,
        lesson,
        duration,
        price,
        bookedTimeIntervals,
        app_trans_id,
      } = foundNotYetPaidOrder

      const bookedLesson = {
        user: student,
        teacher,
        lesson,
        duration,
        price,
        bookedTime: bookedTimeIntervals,
        app_trans_id,
      }

      const newBookedLesson = await LearningScheduleForStudent(bookedLesson)

      const savedBookedLesson = await newBookedLesson.save()

      console.log('savedBookedLesson:', savedBookedLesson)

      await foundNotYetPaidOrder.remove()

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
      }
    }
  } catch (ex) {
    result.return_code = 0 // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result)
}

const testRoute = async (req, res) => {
  const { app_trans_id } = req.body

  // Create a new booked lesson in LearningScheduleForStudent
  const foundNotYetPaidOrder = await NotYetPaidOrder.findOne({
    app_trans_id,
  })

  console.log('foundNotYetPaidOrder:', foundNotYetPaidOrder)

  const { student, teacher, lesson, duration, price, bookedTimeIntervals } =
    foundNotYetPaidOrder

  const bookedLesson = {
    user: student,
    teacher,
    lesson,
    duration,
    price,
    bookedTime: bookedTimeIntervals,
  }

  const newBookedLesson = await LearningScheduleForStudent(bookedLesson)

  const savedBookedLesson = await newBookedLesson.save()

  console.log('savedBookedLesson:', savedBookedLesson)

  await foundNotYetPaidOrder.remove()
  // const config = {
  //   key2: "eG4r0GcoNtRGbO8"
  // };

  // let result = {};

  // try {
  //   let dataStr = {

  //   }
  //   let reqMac = req.body.mac;

  //   let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

  //   // kiểm tra callback hợp lệ (đến từ ZaloPay server)
  //   if (reqMac !== mac) {
  //     // callback không hợp lệ
  //     result.returncode = -1;
  //     result.returnmessage = "mac not equal";
  //   }
  //   else {
  //     // thanh toán thành công
  //     // merchant cập nhật trạng thái cho đơn hàng
  //     let dataJson = JSON.parse(dataStr, config.key2);
  //     console.log("update order's status = success where apptransid =", dataJson["apptransid"]);

  //     result.returncode = 1;
  //     result.returnmessage = "success";
  //   }
  // } catch (ex) {
  //   result.returncode = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
  //   result.returnmessage = ex.message;
  // }
}

// @desc    Get successful order to sync redux state at front end
// @route   GET /api/zaloPayment/sync-successful-order/:app_trans_id
// @access  Private
const syncSuccessfulOrder = async (req, res) => {
  const app_trans_id = req.params.app_trans_id

  try {
    const bookedLesson = await LearningScheduleForStudent.findOne({
      app_trans_id,
    })
      .populate('lesson', ['lessonName'])
      .populate('teacher', ['name'])

    if (!bookedLesson) {
      return res
        .status(400)
        .json({ msg: 'Không thể tìm thấy bài học được đặt thành công.' })
    }

    // get available time of teacher
    const teachingScheduleForTeacher = await TeachingScheduleForTeacher.findOne(
      {
        user: bookedLesson.teacher,
      }
    )

    const { availableTime } = teachingScheduleForTeacher

    return res
      .status(200)
      .json({ bookedLesson, teacherAvailableTime: availableTime })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

module.exports = {
  createOrder,
  handleIPNCallback,
  testRoute,
  syncSuccessfulOrder,
}
