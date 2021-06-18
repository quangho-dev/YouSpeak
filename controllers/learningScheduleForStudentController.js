const LearningScheduleForStudent = require('../models/LearningScheduleForStudent')
const TeachingScheduleForTeacher = require('../models/TeachingScheduleForTeacher')
const ProfileTeacher = require('../models/profileTeacherModel')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')
const { validationResult } = require('express-validator')

// @route    POST api/booking-calendar-student
// @desc     Book a time for learning
// @access   Private
const bookTime = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { bookedTime, teacher, duration, lesson, price } = req.body

  try {
    const newBookedTime = new LearningScheduleForStudent({
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

    sendEmail({
      htmlOutput: `<p>You have received a new order for a lesson</p>
  <p>Please click <a href='http://localhost:3000/teachers/bookedLesson/${bookedTimeData._id}'>this link</a> to confirm that you can deliver the lesson on time.</p>`,
      to: teacherInfo.email,
      from: 'YouSpeak <quang.ho1804@gmail.com>',
      subject: "You've had a new booked lesson",
    })

    // Remove booked time from teacher's available time
    const teacherAvailableTime = await TeachingScheduleForTeacher.findOne({
      user: teacher,
    })

    const availableTime = teacherAvailableTime.availableTime

    const THIRTY_MINUTES_IN_MILLISECONDS = 1800000
    const FORTY_FIVE_MINUTES_IN_MILLISECONDS = 2700000
    const ONE_HOUR_IN_MILLISECONDS = 3600000

    if (duration === THIRTY_MINUTES_IN_MILLISECONDS) {
      const filteredAvailTimeArray = availableTime.filter(
        (element) =>
          new Date(element.start).getTime() !==
          new Date(bookedTime[0].start).getTime()
      )

      teacherAvailableTime.availableTime = filteredAvailTimeArray

      const newTeacherAvailableTime = await teacherAvailableTime.save()

      // Update booked lessons array in teacher's profile
      const profileTeacher = await ProfileTeacher.findOne({ user: teacher })

      profileTeacher.bookedLessons.push(bookedTimeData._id)

      const newProfileTeacher = await profileTeacher.save()

      res.json({
        bookedTimeData,
        newTeacherAvailableTime,
        newProfileTeacher,
      })
    } else if (
      duration === FORTY_FIVE_MINUTES_IN_MILLISECONDS ||
      duration === ONE_HOUR_IN_MILLISECONDS
    ) {
      const filteredAvailTimeArray = availableTime.filter(
        (element) =>
          new Date(element.start).getTime() !==
          new Date(bookedTime[0].start).getTime()
      )

      const secondfilterdAvailTimeArray = filteredAvailTimeArray.filter(
        (item) =>
          new Date(item.start).getTime() !==
          new Date(bookedTime[1].start).getTime()
      )

      teacherAvailableTime.availableTime = secondfilterdAvailTimeArray

      const newTeacherAvailableTime = await teacherAvailableTime.save()

      // Update booked lessons array in teacher's profile
      const profileTeacher = await ProfileTeacher.findOne({ user: teacher })

      profileTeacher.bookedLessons.push(bookedTimeData._id)

      const newProfileTeacher = await profileTeacher.save()

      res.json({
        bookedTimeData,
        newTeacherAvailableTime,
        newProfileTeacher,
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

// @route    DELETE api/learning-schedule-for-student/cancel-booked-lesson/:bookedTimeId
// @desc     Cancel a booked lesson
// @access   Private
const cancelBookedLesson = async (req, res) => {
  try {
    const bookedTime = await LearningScheduleForStudent.findById(
      req.params.bookedTimeId
    )

    if (!bookedTime) {
      return res.status(404).json({ msg: 'Không tìm thấy giờ học.' })
    }

    const { bookedTime: bookedDuration, teacher } = bookedTime

    //  Add cancel booked time to teacher's available time
    const cancelBookedTimeArray = bookedDuration.map((duration) => {
      return {
        start: duration.start,
        end: duration.end,
        title: 'Available Time',
        id: duration.id,
      }
    })

    const teacherAvailableTime = await TeachingScheduleForTeacher.findOne({
      user: teacher,
    })

    const newAvailableTimeArray = [
      ...teacherAvailableTime.availableTime,
    ].concat(cancelBookedTimeArray)

    teacherAvailableTime.availableTime = newAvailableTimeArray

    const newTeacherAvailableTime = await teacherAvailableTime.save()

    await bookedTime.remove()

    res.json({
      msg: 'Đã hủy bài học',
      newTeacherAvailableTime,
    })
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

// @route    GET api/learning-schedule-for-student/bookedLessons
// @desc     Get all booked lessons
// @access   Private
const getBookedLessons = async (req, res) => {
  try {
    const bookedLessons = await LearningScheduleForStudent.find({
      user: req.user.id,
    })
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
    const bookedLesson = await LearningScheduleForStudent.findById(
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

module.exports = {
  bookTime,
  cancelBookedLesson,
  getBookedLessons,
  getBookedLessonById,
}
