import React from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { object, string } from 'yup'
import * as Yup from 'yup'
import { registerTeacher } from '../../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
  card: {
    // Provide some spacing between cards
    margin: 16,

    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    display: 'flex',
    flexDirection: 'column',

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    justifyContent: 'space-between',
  },
  paddingContainer: {
    padding: '0 4em',
  },
  linkText: {
    textTransform: 'uppercase',
    '&:hover, &:visited, &:active': {
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
  formControl: {
    marginBottom: '1em',
  },
  rowContainer: {
    padding: '0 4em',
  },
  degreeImageCard: {
    maxWidth: 300,
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  expImageCard: {
    maxWidth: 300,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const TeacherRegisterForm = (props) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { loading } = auth

  const validation = object({
    name: string().required('Name is required'),
    email: string().email('Email is not correct').required('Email is required'),
    password: string()
      .min(6, 'Password must have at least 6 characters')
      .required('Password is required'),
    confirmPassword: string()
      .oneOf([Yup.ref('password'), null], 'Passwords are not matched')
      .required('Confirm password is required'),
  })

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    dispatch(registerTeacher(values))
    resetForm({ name: '', email: '', password: '', confirmPassword: '' })
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validation}
      onSubmit={onSubmitHandler}
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          <Grid
            container
            alignItems="center"
            className={classes.paddingContainer}
            style={{ marginRight: 'auto' }}
          >
            <Grid item>
              <Link to="/for-teacher">
                <ArrowBackIcon fontSize="large" color="primary" />
              </Link>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                component={Link}
                to="/for-teacher"
                style={{
                  fontWeight: '600',
                  marginLeft: '0.5em',
                  textDecoration: 'none',
                }}
                className={classes.linkText}
              >
                Back
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.paddingContainer}
            style={{ width: '70%', margin: 'auto' }}
          >
            <Grid item>
              <Typography variant="h4" style={{ textTransform: 'uppercase' }}>
                Register teacher account
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field fullWidth name="name" component={TextField} label="Name" />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="Email"
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                name="password"
                component={TextField}
                label="Password"
                fullWidth
                type="password"
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                fullWidth
                name="confirmPassword"
                component={TextField}
                label="Confirm password"
                type="password"
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ color: 'white' }}
                fullWidth
                disabled={!isValid || isSubmitting}
              >
                {loading ? <CircularProgress color="secondary" /> : 'Sign up'}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ margin: '0.7em 0' }}
          >
            <Grid item>
              <Typography variant="body1">Already registerd?</Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/login"
                variant="text"
                style={{
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: '600',
                }}
                disableRipple
              >
                Sign in
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ margin: '0.7em 0' }}
          >
            <Grid item>
              <Typography variant="body1">
                Already signed up but not confirm account yet?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/teachers/request-resend-confirmation-token"
                variant="text"
                style={{
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: '600',
                }}
                disableRipple
              >
                Request confirm account link.
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default TeacherRegisterForm
