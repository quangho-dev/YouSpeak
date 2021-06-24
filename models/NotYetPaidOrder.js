const mongoose = require('mongoose')

const NotYetPaidOrderSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    bookedTimeIntervals: {
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
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const NotYetPaidOrder = mongoose.model('notYetPaidOrder', NotYetPaidOrderSchema)

module.exports = NotYetPaidOrder
