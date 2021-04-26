import nodemailer from 'nodemailer'

const sendContactUsEmail = (req, res) => {
  const { name, email, phonenumber, message } = req.body

  const output = `<p>You have a new contact request</p>
  <h3>Contact details:</h3>
  <ul>
     <li>Name: ${name}</li>
     <li>Email: ${email}</li>
     <li>Phonenumber: ${phonenumber}</li>
  </ul>
  <h3>Message</h3>
  <p>${message}</p>`

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'quang.ho1804@gmail.com',
      pass: 'un1c0rn1234',
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const mailOptions = {
    to: 'quang.ho1804@gmail.com',
    from: `"${name}" <${email}>`,
    subject: 'Contact us message',
    html: output,
  }

  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    return res
      .status(200)
      .json({ success: true, msg: "You've sent an email successfully!" })
  })
}

export default sendContactUsEmail
