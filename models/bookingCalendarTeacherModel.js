const mongoose = require('mongoose')

const BookingCalendarTeacherSchema = new mongoose.Schema({
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

const BookingCalendarTeacher = mongoose.model(
  'bookingCalendarTeacher',
  BookingCalendarTeacherSchema
)

module.exports = BookingCalendarTeacher