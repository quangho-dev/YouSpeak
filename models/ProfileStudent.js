const mongoose = require('mongoose')

const ProfileStudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    address: {
      type: String,
    },
    imageAvatar: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
    },
    englishLevel: {
      type: Number,
    },
    skypeId: {
      type: String,
    },
    phoneNumber: String,
    introduction: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const ProfileStudent = mongoose.model('profileStudent', ProfileStudentSchema)

module.exports = ProfileStudent
