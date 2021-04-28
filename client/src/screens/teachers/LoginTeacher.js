import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { loginTeacher } from '../../actions/authTeacher'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import Avatar from '@material-ui/core/Avatar'
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
  avatar: {
    margin: '0.7em',
    backgroundColor: theme.palette.common.green,
  },
}))

const LoginTeacher = () => {
  const classes = useStyles()
  const initialValues = {
    email: '',
    password: '',
  }

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated } = auth

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email is not correct')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const onSubmit = async (values) => {
    const { email, password } = values
    dispatch(loginTeacher(email, password))
  }

  if (isAuthenticated) {
    return <Redirect to="/teachers/dashboard" />
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Sign in teacher account
          </Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form style={{ maxWidth: '25em' }}>
                  <Field
                    component={TextField}
                    type="email"
                    label="Email"
                    name="email"
                    fullWidth
                    className={classes.formControl}
                  />
                  <Field
                    component={TextField}
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    className={classes.formControl}
                  />
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!formik.isValid}
                    style={{ color: 'white' }}
                  >
                    Sign in
                  </Button>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: '0.7em 0' }}
                  >
                    <Grid item>
                      <Typography variant="body1">
                        You don't have an account?
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        component={Link}
                        to="/teachers/register"
                        variant="text"
                        style={{
                          fontSize: '1rem',
                          textTransform: 'none',
                          fontWeight: '600',
                        }}
                        disableRipple
                      >
                        Sign up
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </>
  )
}

export default LoginTeacher
