const mongoose = require('mongoose')

const LearningScheduleForStudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    bookedTime: [{ start: Date, end: Date, id: String, title: String }],
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'typeOfLesson',
    },
    duration: {
      type: Number,
      isRequired: true,
    },
    price: {
      type: Number,
      isRequired: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
    isCanceled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const LearningScheduleForStudent = mongoose.model(
  'learningScheduleForStudent',
  LearningScheduleForStudentSchema
)

module.exports = LearningScheduleForStudent
