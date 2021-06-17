const mongoose = require('mongoose')

// Day la thoi gian co the day cua giao vien
const TeachingScheduleForTeacherSchema = new mongoose.Schema({
  // user co nghia la teacher
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  availableTime: [
    {
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
      id: String,
      title: String,
    },
  ],
})

const TeachingScheduleForTeacher = mongoose.model(
  'teachingScheduleForTeacher',
  TeachingScheduleForTeacherSchema
)

module.exports = TeachingScheduleForTeacher
