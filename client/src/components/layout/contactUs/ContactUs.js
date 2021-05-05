import React from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import MyButton from '../../ui/MyButton'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { makeStyles, useTheme } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    paddingLeft: '1.5em',
    paddingRight: '1.5em',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '3em',
      paddingRight: '3em',
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: '5em',
      paddingRight: '5em',
    },
  },
  bottomMargin: {
    marginBottom: '2em',
  },
}))

const ContactUs = () => {
  const classes = useStyles()
  const theme = useTheme()

  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

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
            className={classes.rowContainer}
            style={{
              margin: matchesMD
                ? '7em 0 2em'
                : matchesSM
                ? '9em 0 2em'
                : '7em 0 2em',
            }}
          >
            <Grid
              item
              style={{ alignSelf: 'center' }}
              className={classes.bottomMargin}
            >
              <Typography
                variant={matchesSM ? 'h4' : 'h5'}
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
              <Card
                style={{
                  backgroundColor: '#F5D832',
                  padding: matchesMD ? '1em' : undefined,
                }}
              >
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

            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ width: '100%' }}
            >
              <Grid
                item
                className={classes.bottomMargin}
                style={{
                  width: matchesMD ? '70%' : matchesSM ? '80%' : '100%',
                }}
              >
                <Field
                  name="name"
                  type="text"
                  component={TextField}
                  label="Tên / Name"
                  style={{ width: '100%' }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: matchesMD ? '70%' : matchesSM ? '80%' : '100%',
                }}
              >
                <Field
                  name="email"
                  type="email"
                  component={TextField}
                  label="Email của bạn / Your email"
                  className={classes.bottomMargin}
                  style={{ width: '100%' }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: matchesMD ? '70%' : matchesSM ? '80%' : '100%',
                }}
              >
                <Field
                  name="phonenumber"
                  type="number"
                  component={TextField}
                  label="Số điện thoại / Your phone number"
                  className={classes.bottomMargin}
                  style={{ width: '100%' }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: matchesMD ? '70%' : matchesSM ? '80%' : '100%',
                }}
              >
                <Field
                  name="message"
                  type="text"
                  component={TextField}
                  label="Tin nhắn / Message"
                  multiline
                  rows={6}
                  className={classes.bottomMargin}
                  style={{ width: '100%' }}
                />
              </Grid>

              <Grid
                item
                style={{
                  width: matchesMD ? '70%' : matchesSM ? '80%' : '100%',
                }}
              >
                <MyButton
                  type="submit"
                  disabled={isSubmitting || !isValid || !(isValid && dirty)}
                  style={{ width: '100%' }}
                >
                  Gửi / Send message
                </MyButton>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default ContactUs
