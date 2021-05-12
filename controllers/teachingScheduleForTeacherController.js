const TeachingScheduleForTeacher = require('../models/TeachingScheduleForTeacher')
const LearningScheduleForStudent = require('../models/LearningScheduleForStudent')

// @route    POST api/booking-calendar-teacher
// @desc     Set available time for teacher
// @access   Private
const setAvailableTime = async (req, res) => {
  const { availableTime } = req.body

  const availableTimeFields = {
    availableTime,
  }

  try {
    const teachingScheduleForTeacher = await TeachingScheduleForTeacher.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { $set: availableTimeFields },
      { new: true, upsert: true }
    )

    if (!teachingScheduleForTeacher) {
      return res
        .status(400)
        .json({ msg: 'Không có lịch dạy của giáo viên này.' })
    }

    res.json(teachingScheduleForTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/booking-calendar-teacher/me
// @desc     Get available time of teacher
// @access   Private
const getAvailableTime = async (req, res) => {
  try {
    const availableTime = await TeachingScheduleTeacher.findOne({
      user: req.user.id,
    }).populate('user', ['name'])

    if (!availableTime) {
      return res
        .status(400)
        .json({ msg: 'Không có lịch dạy của giáo viên này.' })
    }

    res.json(availableTime)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/booking-calendar-teacher/:teacherCalendarId
// @desc     Get available time of a specific
// @access   Private
const getAvailableTimeOfATeacher = async (req, res) => {
  try {
    const availableTime = await TeachingScheduleForTeacher.findOne({
      user: req.params.teacherCalendarId,
    }).populate('user', ['name'])

    if (!availableTime) {
      return res
        .status(400)
        .json({ msg: 'Không có lịch dạy của giáo viên này.' })
    }

    res.json(availableTime)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    PUT api/booking-calendar-teacher/:bookedLessonId
// @desc     Confirm booked lesson
// @access   Private
const confirmBookedLesson = async (req, res) => {
  try {
    const bookedLesson = await LearningScheduleForStudent.findById(
      req.params.bookedLessonId
    )

    if (!bookedLesson) {
      return res.status(400).json({ msg: 'Không tìm thấy bài học này.' })
    }

    bookedLesson.isConfirmed = true

    await bookedLesson.save()
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    DELETE api/booking-calendar-teacher/:bookedLessonId
// @desc     Cancel a booked lesson
// @access   Private
const cancelBookedLesson = async (req, res) => {
  try {
    const bookedLesson = await LearningScheduleForStudent.findById(
      req.params.bookedLessonId
    )

    if (!bookedLesson) {
      return res.status(404).json({ msg: 'Không tìm thấy giờ học.' })
    }

    const {
      user,
      bookedTime: bookedDuration,
      teacher,
      lesson,
      duration,
    } = bookedLesson

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

    // Check user
    if (bookedLesson.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await bookedLesson.remove()

    res.json({
      msg: 'Đã hủy giờ học.',
      addedAvailableTime: returnTeacherAvailableTime,
    })
  } catch (err) {
    console.error(err.message)

    res.status(500).send('Server Error')
  }
}

module.exports = {
  setAvailableTime,
  getAvailableTime,
  getAvailableTimeOfATeacher,
  confirmBookedLesson,
  cancelBookedLesson,
}