import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { getCurrentProfileTeacher } from '../../actions/profileTeacher'
import ReactPlayer from 'react-player'
import { format } from 'date-fns'
import EditIcon from '@material-ui/icons/Edit'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ShowMoreText from 'react-show-more-text'
import { connect } from 'react-redux'
import Spinner from '../../components/ui/Spinner'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '0 4em',
  },
  formControl: {
    marginBottom: '0.5em',
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
  subHeader: {
    fontSize: '17px',
    fontWeight: '500',
  },
}))

const DashboardTeacher = ({
  auth: { user },
  profileTeacher: { profileTeacher, loading },
  getCurrentProfileTeacher,
}) => {
  const classes = useStyles()

  const renderImages = (source) => {
    return source.map((photo, index) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <img src={photo} className={classes.expImage} alt="experience" />
        </Grid>
      )
    })
  }

  const executeOnClick = () => {}

  useEffect(() => {
    getCurrentProfileTeacher()
  }, [getCurrentProfileTeacher])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container direction="column" className="container">
          <Grid item style={{ marginBottom: '1em', alignSelf: 'center' }}>
            <Typography
              variant="h4"
              style={{ textTransform: 'uppercase', fontWeight: '500' }}
            >
              Dashboard
            </Typography>
          </Grid>

          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="h5">
              Hello {user && user !== '' && user.name}
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignItems="center"
            style={{ marginBottom: '2em' }}
          >
            <Grid item>
              {user && (
                <Chip
                  label={`ID: ${user._id}`}
                  style={{ marginBottom: '1em' }}
                />
              )}
            </Grid>

            {profileTeacher && (
              <Grid item>
                <Avatar
                  src={null || profileTeacher.teacherAvatar}
                  style={{
                    width: '70px',
                    height: '70px',
                    marginBottom: '0.5em',
                  }}
                />
              </Grid>
            )}

            <Grid item>
              <Button
                component={Link}
                variant="contained"
                color="primary"
                to="/teachers/create-profile"
                style={{ color: 'white' }}
              >
                <EditIcon fontSize="small" />
                &nbsp;Edit profile
              </Button>
            </Grid>
          </Grid>

          <Grid container justify="center" alignItems="center" spacing={2}>
            <Grid item>
              <Button
                component={Link}
                variant="contained"
                color="primary"
                to="/teachers/lessons"
                style={{ color: 'white' }}
              >
                <MenuBookIcon fontSize="small" />
                &nbsp;Edit types of lesson
              </Button>
            </Grid>

            <Grid item>
              <Button
                component={Link}
                variant="contained"
                color="primary"
                to="/booking-calendar-teacher"
                style={{ color: 'white' }}
              >
                <DateRangeIcon fontSize="small" />
                &nbsp;Edit available time
              </Button>
            </Grid>
          </Grid>

          {profileTeacher && profileTeacher.typeOfTeacher !== null && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1">
                <span className={classes.subHeader}>Type of teacher:</span>
                &nbsp;
                {profileTeacher.typeOfTeacher === 'professional'
                  ? 'Professional teacher'
                  : 'Community tutor'}
              </Typography>
            </Grid>
          )}

          {profileTeacher && profileTeacher.dateOfBirth !== null && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1">
                <span className={classes.subHeader}>Date of birth: </span>
                {format(new Date(profileTeacher.dateOfBirth), 'dd/MM/yyyy')}
              </Typography>
            </Grid>
          )}

          {profileTeacher.hometown !== null && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1">
                <span className={classes.subHeader}>From: </span>{' '}
                {profileTeacher.hometown.label}
              </Typography>
            </Grid>
          )}

          {profileTeacher.skypeId && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1">
                <span className={classes.subHeader}>Skype ID: </span>&nbsp;
                {profileTeacher.skypeId}
              </Typography>
            </Grid>
          )}

          {profileTeacher.phoneNumber && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1">
                <span className={classes.subHeader}>Phone number: </span>&nbsp;
                {profileTeacher.phoneNumber}
              </Typography>
            </Grid>
          )}

          {profileTeacher && profileTeacher.introduction !== null && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1" className={classes.subHeader}>
                Introduction about teacher:
              </Typography>
              <Typography component={'span'} variant="body1">
                <ShowMoreText
                  lines={3}
                  more="Read more"
                  less="Show less"
                  className="content-css"
                  anchorClass="my-anchor-css-class"
                  onClick={executeOnClick}
                  expanded={false}
                  width={700}
                >
                  {profileTeacher.introduction}
                </ShowMoreText>
              </Typography>
            </Grid>
          )}

          {profileTeacher &&
            profileTeacher.video !== null &&
            profileTeacher.thumbnail !== null && (
              <Grid
                item
                className={classes.formControl}
                style={{ marginBottom: '1em' }}
              >
                <Typography
                  variant="body1"
                  style={{ margin: '0.5em 0' }}
                  className={classes.subHeader}
                >
                  Video introduction:
                </Typography>
                {profileTeacher && profileTeacher.video && (
                  <ReactPlayer
                    url={`/${profileTeacher.video}`}
                    controls
                    playing
                    light={`/${profileTeacher.thumbnail}`}
                  />
                )}
              </Grid>
            )}

          {profileTeacher &&
            profileTeacher.degreeImages &&
            profileTeacher.degreeImages.length > 0 &&
            profileTeacher.typeOfTeacher !== 'commutor' && (
              <Grid item style={{ marginBottom: '3em' }}>
                <Typography
                  variant="body1"
                  className={classes.subHeader}
                  style={{ margin: '0.5em 0' }}
                >
                  Images of teaching certificates:
                </Typography>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  {renderImages(profileTeacher.degreeImages)}
                </Grid>
              </Grid>
            )}

          {profileTeacher &&
            profileTeacher.expImages &&
            profileTeacher.expImages.length > 0 &&
            profileTeacher.typeOfTeacher !== 'commutor' && (
              <Grid item style={{ marginBottom: '1em' }}>
                <Typography
                  variant="body1"
                  className={classes.subHeader}
                  style={{ margin: '0.5em 0' }}
                >
                  Images of teaching experiences:
                </Typography>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  {renderImages(profileTeacher.expImages)}
                </Grid>
              </Grid>
            )}
        </Grid>
      )}
    </>
  )
}

DashboardTeacher.propTypes = {
  auth: PropTypes.object.isRequired,
  profileTeacher: PropTypes.object.isRequired,
  getCurrentProfileTeacher: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profileTeacher: state.profileTeacher,
})

export default connect(mapStateToProps, { getCurrentProfileTeacher })(
  DashboardTeacher
)
