import mongoose from 'mongoose'

const ProfileSchema = new mongoose.Schema(
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
    phoneNumber: Number,
    introduction: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Profile = mongoose.model('profile', ProfileSchema)

export default Profile
