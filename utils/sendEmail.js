const nodemailer = require('nodemailer')

const sendEmail = ({ htmlOutput, to, from, subject }) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'quang.ho1804@gmail.com',
      pass: 'Un1c0rn!1234',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const mailOptions = {
    to,
    from,
    subject,
    html: htmlOutput,
  }

  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error)
    }
  })
}

module.exports = sendEmail
