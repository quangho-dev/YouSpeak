const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    studentName: {
      type: String,
    },
    studentAvatar: {
      type: String,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    votes: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('review', ReviewSchema)
