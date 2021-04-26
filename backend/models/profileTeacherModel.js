import mongoose from 'mongoose'

const ProfileTeacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    typeOfTeacher: {
      type: String,
      required: true,
    },
    degreeImages: {
      type: [String],
    },
    teacherAvatar: {
      type: String,
      required: true,
    },
    expImages: {
      type: [String],
    },
    dateOfBirth: {
      type: Date,
    },
    hometown: {
      value: String,
      label: String,
    },
    skypeId: String,
    phoneNumber: Number,
    introduction: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    videoDuration: {
      type: Number,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson',
      },
    ],
    trialRate: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const ProfileTeacher = mongoose.model('profileTeacher', ProfileTeacherSchema)

export default ProfileTeacher
