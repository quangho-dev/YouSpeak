const mongoose = require('mongoose')

// Day la cac bai hoc da duoc dat boi hoc sinh
const LearningScheduleForStudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    bookedTime: {
      type: [{ start: Date, end: Date, id: String, title: String }],
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'typeOfLesson',
      required: true,
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
    app_trans_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const LearningScheduleForStudent = mongoose.model(
  'learningScheduleForStudent',
  LearningScheduleForStudentSchema
)

module.exports = LearningScheduleForStudent
