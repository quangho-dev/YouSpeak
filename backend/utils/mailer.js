import nodeMailer from 'nodemailer'

const adminEmail = 'quang.ho1804@gmail.com'
const adminPassword = 'abcdlkjh'

const mailHost = 'smtp.gmail.com'

const mailPort = 587

const sendMail = ({to, subject, htmlContent}, callback) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  })
  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  }

  return transporter.sendMail(options, callback)
}
export { sendMail }
