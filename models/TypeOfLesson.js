const mongoose = require('mongoose')

const TypeOfLessonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  lessonName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  periods: [
    {
      thirtyMinutes: {
        isChosen: {
          type: Boolean,
          default: false,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
      fortyFiveMinutes: {
        isChosen: {
          type: Boolean,
          default: false,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
      oneHour: {
        isChosen: {
          type: Boolean,
          default: false,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    },
  ],
  documents: [String],
})

const TypeOfLesson = mongoose.model('typeOfLesson', TypeOfLessonSchema)

module.exports = TypeOfLesson
