import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/auth'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
}))

const LoginForm = ({ setOpenSignIn, location, history }) => {
  const classes = useStyles()
  const initialValues = {
    email: '',
    password: '',
  }

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, loading } = auth

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không đúng')
      .required('Không được để trống'),
    password: Yup.string().required('Không được để trống'),
  })

  const onSubmit = async (values) => {
    const { email, password } = values
    dispatch(login(email, password))
    setOpenSignIn(false)
    history.push('/dashboard')
  }

  return (
    <>
      {loading && <CircularProgress />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form style={{ maxWidth: '25em' }}>
              <FormikControl
                control="input"
                type="email"
                label="Email"
                name="email"
                className={classes.formControl}
              />
              <FormikControl
                control="input"
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
                Đăng nhập
              </Button>
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{ margin: '0.7em 0' }}
              >
                <Grid item>
                  <Typography variant="body1">
                    Bạn chưa có tài khoản?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to="/register"
                    variant="text"
                    style={{
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: '600',
                    }}
                    disableRipple
                  >
                    Đăng ký
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default LoginForm
