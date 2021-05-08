import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Field, useFormikContext } from 'formik'
import { makeStyles } from '@material-ui/styles'
import { TextField } from 'formik-material-ui'
import MuiDatePicker from './inputs/MuiDatePicker'
import ProfileCountrySelector from './inputs/ProfileCountrySelector'
import 'react-toastify/dist/ReactToastify.css'
import DegreeImagesUploader from './DegreeImagesUploader'
import ExpImagesUploader from './ExpImagesUploader'
import VideoUploader from './VideoUploader'
import TeacherAvatarUploader from './TeacherAvatarUploader'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
  },
  degreeImageCard: {
    maxWidth: 300,
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  // expImageCard: {
  //   maxWidth: 300,
  // },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const ProfileTeacherPage2 = () => {
  const { values } = useFormikContext()

  const classes = useStyles()

  return (
    <Grid
      item
      container
      justify="center"
      alignItems="center"
      direction="column"
      spacing={3}
    >
      <Grid item>
        <Typography
          variant="h5"
          align="center"
          style={{
            textTransform: 'uppercase',
            fontWeight: '600',
          }}
        >
          Edit profile
        </Typography>
      </Grid>

      <Grid item>
        <Typography variant="body2">( * ) Required input</Typography>
      </Grid>

      <Grid item>
        <TeacherAvatarUploader />
      </Grid>

      <Grid item className={classes.formControl}>
        <MuiDatePicker />
      </Grid>

      <Grid item className={classes.formControl}>
        <div>
          <label htmlFor={'abc'} style={{ fontWeight: '400' }}>
            Choose your nationality: ( * )
          </label>
          <br />
          <ProfileCountrySelector />
        </div>
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="skypeId"
          type="text"
          component={TextField}
          value={values.skypeId}
          label="Skype ID: ( * )"
          style={{ minWidth: '100%' }}
        />
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="phoneNumber"
          type="number"
          component={TextField}
          label="Your phone number: ( * )"
          style={{ minWidth: '100%' }}
        />
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="introduction"
          type="text"
          component={TextField}
          label="Let's write a short paragraph for students to know more about you: ( * )"
          multiline
          rows={5}
          style={{ minWidth: '100%' }}
        />
      </Grid>

      <Grid item className={classes.formControl}>
        <VideoUploader />
      </Grid>

      {values && values.typeOfTeacher === 'professional' && (
        <Grid item className={classes.formControl}>
          <DegreeImagesUploader />
        </Grid>
      )}

      {values && values.typeOfTeacher === 'professional' && (
        <Grid item className={classes.formControl}>
          {' '}
          <ExpImagesUploader />
        </Grid>
      )}
    </Grid>
  )
}

export default ProfileTeacherPage2
