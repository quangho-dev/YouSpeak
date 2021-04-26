import BookingCalendarStudent from '../models/bookingCalendarStudentModel.js'
import BookingCalendarTeacher from '../models/bookingCalendarModel.js'
import ProfileTeacher from '../models/profileTeacherModel.js'
import Profile from '../models/profileModel.js'
import nodemailer from 'nodemailer'
import User from '../models/userModel.js'

// @route    POST api/booking-calendar-student
// @desc     Book a time for learning
// @access   Private
const bookTime = async (req, res) => {
  const { bookedTime, teacher, duration, lesson, price } = req.body

  try {
    const newBookedTime = new BookingCalendarStudent({
      user: req.user.id,
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
        pass: 'un1c0rn1234',
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

    const teacherAvailableTime = await BookingCalendarTeacher.findOne({
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

      res.json(bookedTimeData)
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// @route    DELETE api/booking-calendar-student/cancel-booked-lesson/:bookedTimeId
// @desc     Delete a booked lesson
// @access   Private
const cancelBookedLesson = async (req, res) => {
  try {
    const bookedTime = await BookingCalendarStudent.findById(
      req.params.bookedTimeId
    )

    if (!bookedTime) {
      return res.status(404).json({ msg: 'Không tìm thấy giờ học.' })
    }

    const {
      user,
      bookedTime: bookedDuration,
      teacher,
      lesson,
      duration,
    } = bookedTime

    const availableTimeArray = bookedDuration.map((duration) => {
      return {
        start: duration.start,
        end: duration.end,
        title: 'Available Time',
        id: duration.id,
      }
    })

    const teacherAvailableTime = await BookingCalendarTeacher.findOne({
      user: teacher,
    })

    const newAvailableTimeArray = [
      ...teacherAvailableTime.availableTime,
    ].concat(availableTimeArray)

    teacherAvailableTime.availableTime = newAvailableTimeArray

    const returnTeacherAvailableTime = await teacherAvailableTime.save()

    // Check user
    // if (bookedTime.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: 'User not authorized' })
    // }

    await bookedTime.remove()

    res.json({
      msg: 'Đã hủy giờ học.',
      addedAvailableTime: returnTeacherAvailableTime,
    })
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

// @route    GET api/booking-calendar-student/bookedLessons
// @desc     Get all booked lessons
// @access   Private
const getBookedLessons = async (req, res) => {
  try {
    const bookedLessons = await BookingCalendarStudent.find()
      .populate('lesson', ['lessonName'])
      .populate('teacher', ['name'])
      .populate('user', ['name'])
    res.json(bookedLessons)
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

// @route    GET api/booking-calendar-student/:bookedLessonId
// @desc     Get booked lesson by id
// @access   Private
const getBookedLessonById = async (req, res) => {
  try {
    const bookedLesson = await BookingCalendarStudent.findById(
      req.params.bookedLessonId
    )
      .populate('lesson', ['lessonName', 'duration', 'price', 'periods'])
      .populate('user', ['name', 'email'])

    if (!bookedLesson) {
      return res.status(404).json({ msg: 'Không tìm thấy bài học đã đặt này.' })
    }

    res.json(bookedLesson)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export { bookTime, cancelBookedLesson, getBookedLessons, getBookedLessonById }
