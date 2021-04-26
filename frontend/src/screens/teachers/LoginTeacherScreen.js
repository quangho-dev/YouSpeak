import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link, Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/Formik/FormikControl'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { loginTeacher } from '../../actions/authTeacher'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import Avatar from '@material-ui/core/Avatar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
  avatar: {
    margin: '0.7em',
    backgroundColor: theme.palette.common.green,
  },
  paddingContainer: {
    padding: '0 4em',
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
}))

const LogInTeacherScreen = () => {
  const classes = useStyles()
  const initialValues = {
    email: '',
    password: '',
  }

  const dispatch = useDispatch()
  const authTeacher = useSelector((state) => state.authTeacher)
  const { isAuthenticated } = authTeacher

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không đúng')
      .required('Không được để trống'),
    password: Yup.string().required('Không được để trống'),
  })

  const onSubmit = async (values) => {
    const { email, password } = values
    dispatch(loginTeacher(email, password))
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard-teacher" />
  }

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid
          item
          container
          alignItems="center"
          className={classes.paddingContainer}
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
              variant="text"
              style={{
                fontWeight: '600',
                marginLeft: '0.5em',
                textDecoration: 'none',
              }}
              className={classes.linkText}
            >
              Trở về
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Đăng nhập
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
        </Grid>
      </Grid>
    </>
  )
}

export default LogInTeacherScreen
