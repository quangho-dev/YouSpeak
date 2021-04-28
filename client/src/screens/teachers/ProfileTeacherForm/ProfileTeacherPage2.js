import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Field, useFormikContext } from 'formik'
import { makeStyles } from '@material-ui/styles'
import { TextField } from 'formik-material-ui'
import AlertMessage from '../../../components/layout/AlertMessage'
import MuiDatePicker from './inputs/MuiDatePicker'
import ProfileCountrySelector from './inputs/ProfileCountrySelector'
import 'react-toastify/dist/ReactToastify.css'
import DegreeImagesUploader from './DegreeImagesUploader'
import ExpImagesUploader from './ExpImagesUploader'
import VideoUploader from './VideoUploader'
import TeacherAvatarUploader from './TeacherAvatarUploader'

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
    padding: '0 7em',
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

const ProfileTeacherPage2 = () => {
  const { values } = useFormikContext()

  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
      direction="column"
      className={classes.rowContainer}
    >
      <Grid item>
        <AlertMessage />
      </Grid>
      <Grid item>
        <Typography
          variant="h4"
          align="center"
          className={classes.formControl}
          style={{
            textTransform: 'uppercase',
            fontSize: '600',
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

      <Grid
        item
        className={classes.formControl}
        style={{ marginTop: '1em', maxWidth: '20em' }}
      >
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
        />
      </Grid>

      <Grid item className={classes.formControl}>
        <Field
          name="phoneNumber"
          type="number"
          component={TextField}
          label="Your phone number: ( * )"
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
          style={{ width: '50em' }}
        />
      </Grid>

      <VideoUploader />

      {values.typeOfTeacher === 'professional' && <DegreeImagesUploader />}

      {values.typeOfTeacher === 'professional' && <ExpImagesUploader />}
    </Grid>
  )
}

export default ProfileTeacherPage2
