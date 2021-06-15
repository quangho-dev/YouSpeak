const LearningScheduleForStudent = require('../models/LearningScheduleForStudent')
const TeachingScheduleForTeacher = require('../models/TeachingScheduleForTeacher')
const TeacherTaughtLesson = require('../models/TeacherTaughtLesson')
const User = require('../models/userModel')
const sendEmail = require('../utils/sendEmail')

// @route    POST api/booking-calendar-student
// @desc     Book a time for learning
// @access   Private
const bookTime = async (req, res) => {
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
          new Date(bookedTime.start).getTime()
      )

      teacherAvailableTime.availableTime = filteredAvailTimeArray

      await teacherAvailableTime.save()

      res.json(bookedTimeData)
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

      await teacherAvailableTime.save()

      addBookedLessonToTeacherTaughtLessonModel({
        teacher,
        studentId: req.user.id,
        duration,
        typeOfLesson: lesson,
      })

      res.json(bookedTimeData)
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const addBookedLessonToTeacherTaughtLessonModel = async ({
  teacher,
  studentId,
  duration,
  typeOfLesson,
}) => {
  try {
    const newTeacherTaughtLesson = new TeacherTaughtLesson({
      teacher,
      student: studentId,
      duration,
      typeOfLesson,
    })

    await newTeacherTaughtLesson.save()
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}

// @route    DELETE api/booking-calendar-student/cancel-booked-lesson/:bookedTimeId
// @desc     Delete a booked lesson
// @access   Private
const cancelBookedLesson = async (req, res) => {
  try {
    const bookedTime = await LearningScheduleForStudent.findById(
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

    const teacherAvailableTime = await TeachingScheduleForTeacher.findOne({
      user: teacher,
    })

    const newAvailableTimeArray = [
      ...teacherAvailableTime.availableTime,
    ].concat(availableTimeArray)

    teacherAvailableTime.availableTime = newAvailableTimeArray

    const returnTeacherAvailableTime = await teacherAvailableTime.save()

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
