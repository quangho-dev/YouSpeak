import React, { Fragment } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../components/Formik/FormikControl'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { registerUser } from '../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

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
  formControl: {
    marginBottom: '1em',
  },
  avatar: {
    margin: '0.7em',
    backgroundColor: theme.palette.common.green,
  },
}))

const RegisterScreen = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, loading } = auth

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Không được để trống'),
    email: Yup.string()
      .email('Email không đúng')
      .required('Không được để trống'),
    password: Yup.string().required('Không được để trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Mật khẩu không trùng khớp')
      .required('Không được để trống'),
  })

  const onSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values
    dispatch(registerUser({ name, email, password }))
    resetForm({ name: '', email: '', password: '' })
  }

  return (
    <Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        className={classes.rowContainer}
        style={{ margin: '6em 0 2em' }}
      >
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
            Đăng ký tài khoản
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
                  <FormikControl
                    control="input"
                    type="text"
                    label="Tên tài khoản"
                    name="name"
                    className={classes.formControl}
                  />
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
                    label="Mật khẩu"
                    name="password"
                    className={classes.formControl}
                  />
                  <FormikControl
                    control="input"
                    type="password"
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    className={classes.formControl}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!formik.isValid}
                    style={{ color: 'white' }}
                  >
                    {loading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      'Đăng ký'
                    )}
                  </Button>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    style={{ margin: '0.7em 0' }}
                  >
                    <Grid item>
                      <Typography variant="body1">
                        Bạn đã có tài khoản?
                      </Typography>
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
                        Đăng nhập
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default RegisterScreen
