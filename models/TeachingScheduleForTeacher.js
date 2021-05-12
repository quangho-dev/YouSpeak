const mongoose = require('mongoose')

const TeachingScheduleForTeacherSchema = new mongoose.Schema({
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
