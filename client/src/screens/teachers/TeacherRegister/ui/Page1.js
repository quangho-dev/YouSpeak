import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CardActions,
  LinearProgress,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  CardMedia,
  Dialog,
} from '@material-ui/core'
import { Field, Formik, FormikConfig, FormikValues, ErrorMessage } from 'formik'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { CheckboxWithLabel, TextField, Select } from 'formik-material-ui'

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

const Page1 = ({ setFieldValue }) => {
  const classes = useStyles()

  return (
    <>
      {console.log('setFieldValue at Page1:', setFieldValue)}
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.paddingContainer}
        style={{ width: '70%', margin: 'auto' }}
      >
        <Grid item>
          <Typography variant="h4">Đăng ký tài khoản giáo viên</Typography>
        </Grid>
        <Grid item className={classes.formControl} style={{ width: '100%' }}>
          <Field
            fullWidth
            name="name"
            component={TextField}
            label="Tên hiển thị"
          />
        </Grid>
        <Grid item className={classes.formControl} style={{ width: '100%' }}>
          <Field fullWidth name="email" component={TextField} label="Email" />
        </Grid>
        <Grid item className={classes.formControl} style={{ width: '100%' }}>
          <Field
            name="password"
            component={TextField}
            label="Mật khẩu"
            fullWidth
          />
        </Grid>
        <Grid item className={classes.formControl} style={{ width: '100%' }}>
          <Field
            fullWidth
            name="confirmPassword"
            component={TextField}
            label="Xác nhận mật khẩu"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Page1
