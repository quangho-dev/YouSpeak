import User from '../models/userModel.js'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

const forgotPassword = (req, res) => {
  crypto.randomBytes(32, function (err, buf) {
    const token = buf.toString('hex')
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Không có tài khoản tồn tại với email đó.' })
      }
      user.resetPasswordToken = token
      user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
      user.save().then((result) => {
        const smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'quang.ho1804@gmail.com',
            pass: 'un1c0rn1234',
          },
        })

        smtpTransport.sendMail({
          to: user.email,
          from: 'quang.ho1804@gmail.com',
          subject: 'Đặt lại mật khẩu',
          html: `<p>Bạn đã yêu cầu đặt lại mật khẩu:</p><h5>Click vào <a href='http://localhost:3000/reset/${token}'>link này</a> để đặt lại mật khẩu</h5>`,
        })
        res.status(200).json({ msg: 'Vui lòng kiểm tra email của bạn.' })
      })
    })
  })
}

export default forgotPassword
