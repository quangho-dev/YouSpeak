const mongoose = require('mongoose')

const TeacherTaughtLessonSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    typeOfLesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'typeOfLesson',
    },
  },
  {
    timestamps: true,
  }
)

const TeacherTaughtLesson = mongoose.model(
  'teacherTaughtLesson',
  TeacherTaughtLessonSchema
)

module.exports = TeacherTaughtLesson
