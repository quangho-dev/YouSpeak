import mongoose from 'mongoose'

const BookingCalendarStudentSchema = new mongoose.Schema(
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
      ref: 'lesson',
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

const BookingCalendarStudent = mongoose.model(
  'bookingCalendarStudent',
  BookingCalendarStudentSchema
)

export default BookingCalendarStudent
