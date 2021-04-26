import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
})

const Token = mongoose.model('token', TokenSchema)

export default Token
