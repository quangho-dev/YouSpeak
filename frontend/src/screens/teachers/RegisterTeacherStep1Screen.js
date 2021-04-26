import React, { Fragment, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../../components/Formik/FormikControl'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { registerTeacher } from '../../actions/authTeacher'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
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
  linkText: {
    textTransform: 'uppercase',
    '&:hover, &:visited, &:active': {
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
}))

const RegisterTeacherStep1Screen = () => {
  const classes = useStyles()

  return (
    <Fragment>
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
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Đăng ký tài khoản giáo viên
          </Typography>
        </Grid>
        <Grid item>
          <FormikControl
            control="input"
            type="text"
            label="Tên tài khoản"
            name="name"
            className={classes.formControl}
          />
        </Grid>
        <Grid item>
          <FormikControl
            control="input"
            type="email"
            label="Email"
            name="email"
            className={classes.formControl}
          />
        </Grid>
        <Grid item>
          <FormikControl
            control="input"
            type="password"
            label="Mật khẩu"
            name="password"
            className={classes.formControl}
          />
        </Grid>
        <Grid item>
          <FormikControl
            control="input"
            type="password"
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            className={classes.formControl}
          />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            // disabled={!formik.isValid}
            style={{ color: 'white' }}
          >
            {/* {loading ? <CircularProgress color="secondary" /> : 'Đăng ký'} Dang
            ky */}
          </Button>
        </Grid>
        <Grid
          container
          alignItems="center"
          justify="center"
          style={{ margin: '0.7em 0' }}
        >
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
      </Grid>
    </Fragment>
  )
}

export default RegisterTeacherStep1Screen
