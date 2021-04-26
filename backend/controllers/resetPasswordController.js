import User from '../models/userModel.js'
import async from 'async'
import nodemailer from 'nodemailer'

const resetPassword = (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    function (err, user) {
      if (!user) {
        res.status(401).json({ success: false, msg: 'Tài khoản không hợp lệ' })
      }
      res.status(200).json({ user })
    }
  )
}

const createResetPassword = (req, res) => {
  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              res.status(400).json({
                success: false,
                msg: 'Link đặt lại mật khẩu không hoạt động.',
              })
            }

            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined

            user.save(function (err) {
              done(err, user)
            })
          }
        )
      },
      function (user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'quang.ho1804@gmail.com',
            pass: 'un1c0rn1234',
          },
        })
        var mailOptions = {
          to: user.email,
          from: 'quang.ho1804@gmail.com',
          subject: 'Mật khẩu của bạn đã được thay đổi.',
          html: `<p>Xin chào,</p><p>Đây là email xác nhận bạn đã thay đổi mật khẩu của tài khoản ${user.email} thành công.</p>`,
        }
        smtpTransport.sendMail(mailOptions, function (err) {
          res.status(200).json({
            success: true,
            msg: 'Thay đổi mật khẩu thành công!',
          })
          done(err)
        })
      },
    ],
    function (err) {
      if (err) {
        res.status(400).json({ error: err })
      }
    }
  )
}

export { resetPassword, createResetPassword }
