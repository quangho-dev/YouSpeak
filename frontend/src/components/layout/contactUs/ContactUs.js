import React from 'react'
import { Grid, Typography, Card, CardContent } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import MyButton from '../../ui/MyButton'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  bottomMargin: {
    marginBottom: '2em',
  },
}))

const ContactUs = () => {
  const classes = useStyles()

  const initialValues = { name: '', email: '', phonenumber: '', message: '' }

  const validationSchema = yup.object({
    name: yup.string().required('Required'),
    email: yup.string().required('Required'),
    message: yup.string().required('Required'),
  })

  const onSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }

        axios
          .post('/api/contact-us', values, config)
          .then((res) => toast.success(res.data.msg))
          .catch((err) => {
            toast.error('Send email failed')
          })
      } catch (error) {
        console.error(error)
      }
      setSubmitting(false)
    }, 400)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <Grid
            container
            direction="column"
            justify="center"
            className="container"
          >
            <Grid
              item
              style={{ alignSelf: 'center' }}
              className={classes.bottomMargin}
            >
              <Typography
                variant="h4"
                style={{ textTransform: 'uppercase', fontWeight: '500' }}
              >
                Liên hệ với chúng tôi
                <br />
                Contact us
              </Typography>
            </Grid>

            <Grid
              item
              style={{ alignSelf: 'center' }}
              className={classes.bottomMargin}
            >
              <Card style={{ width: '30em', backgroundColor: '#F5D832' }}>
                <CardContent>
                  <Grid container direction="column">
                    <Grid item container justify="center" alignItems="center">
                      <Grid item>
                        <EmailIcon />
                      </Grid>
                      <Grid item>
                        <Typography vairant="body1">
                          &nbsp;<strong>Email: </strong>support@youspeak.com
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container justify="center" alignItems="center">
                      <Grid item>
                        <PhoneIcon />
                      </Grid>
                      <Grid item>
                        <Typography vairant="body1">
                          &nbsp;<strong>Hotline: </strong>0944 81 01 81
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item className={classes.bottomMargin}>
              <Typography variant="body1">
                Nếu bạn có bất cứ câu hỏi nào, vui lòng để lại lời nhắn cho
                chúng tôi.
                <br />
                If you have any questions, please send us a message.
              </Typography>
            </Grid>

            <Grid item className={classes.bottomMargin}>
              <Field
                name="name"
                type="text"
                component={TextField}
                label="Tên / Name"
                style={{ width: '20em' }}
              />
            </Grid>

            <Grid
              container
              justify="space-around"
              alignItems="center"
              className={classes.bottomMargin}
            >
              <Grid item>
                <Field
                  name="email"
                  type="email"
                  component={TextField}
                  label="Email của bạn / Your email"
                  style={{ width: '20em' }}
                />
              </Grid>

              <Grid item>
                <Field
                  name="phonenumber"
                  type="number"
                  component={TextField}
                  label="Số điện thoại / Your phone number"
                  style={{ width: '20em' }}
                />
              </Grid>
            </Grid>

            <Grid item className={classes.bottomMargin}>
              <Field
                name="message"
                type="text"
                component={TextField}
                label="Tin nhắn / Message"
                multiline
                rows={6}
                style={{ width: '50em' }}
              />
            </Grid>

            <Grid item>
              <MyButton
                type="submit"
                disabled={isSubmitting || !isValid || !(isValid && dirty)}
              >
                Gửi / Send message
              </MyButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ContactUs
