import React, { useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Card, CardContent } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
import { getCurrentProfileTeacher } from '../../../actions/profileTeacher'
import ReactPlayer from 'react-player'
import { format } from 'date-fns'
import EditIcon from '@material-ui/icons/Edit'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import DateRangeIcon from '@material-ui/icons/DateRange'
import ShowMoreText from 'react-show-more-text'
import { connect } from 'react-redux'
import Spinner from '../../../components/ui/Spinner'
import PropTypes from 'prop-types'
import './ReactPlayer.css'
import Reviews from '../../../components/teachers/Reviews/Reviews'

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

  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

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
        <Grid
          container
          direction="column"
          className={classes.rowContainer}
          spacing={2}
          style={{ margin: '7em 0 2em', width: '100%' }}
        >
          <Grid item style={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              style={{ textTransform: 'uppercase', fontWeight: '500' }}
            >
              Dashboard
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h5">
              Hello {user && user.name && user.name}
            </Typography>
          </Grid>

          {profileTeacher === null && (
            <Alert severity="warning">
              You haven't created your profile, please create your profile by
              clicking the edit button.
            </Alert>
          )}

          <Grid
            item
            container
            direction="column"
            alignItems="center"
            spacing={1}
            style={{ width: '100%', margin: '0' }}
          >
            <Grid item>{user && <Chip label={`ID: ${user._id}`} />}</Grid>

            <Grid item>
              <Avatar
                src={
                  profileTeacher &&
                  profileTeacher.teacherAvatar &&
                  profileTeacher.teacherAvatar
                }
                style={{
                  width: '80px',
                  height: '80px',
                }}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction={matchesMD ? 'row' : 'column'}
            justify="center"
            spacing={1}
          >
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
            <Grid item>
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
            <Grid item>
              <Typography variant="body1">
                <span className={classes.subHeader}>Date of birth: </span>
                {format(new Date(profileTeacher.dateOfBirth), 'dd/MM/yyyy')}
              </Typography>
            </Grid>
          )}

          {profileTeacher &&
            profileTeacher.hometown &&
            profileTeacher.hometown.label && (
              <Grid item>
                <Typography variant="body1">
                  <span className={classes.subHeader}>From: </span>{' '}
                  {profileTeacher.hometown.label}
                </Typography>
              </Grid>
            )}

          {profileTeacher && profileTeacher.skypeId && (
            <Grid item>
              <Typography variant="body1">
                <span className={classes.subHeader}>Skype ID: </span>&nbsp;
                {profileTeacher.skypeId}
              </Typography>
            </Grid>
          )}

          {profileTeacher && profileTeacher.phoneNumber && (
            <Grid item>
              <Typography variant="body1">
                <span className={classes.subHeader}>Phone number: </span>&nbsp;
                {profileTeacher.phoneNumber}
              </Typography>
            </Grid>
          )}

          {profileTeacher && profileTeacher.introduction !== null && (
            <Grid item>
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
            profileTeacher.cardNumber &&
            profileTeacher.nameOnCard &&
            profileTeacher.bankName && (
              <Grid item style={{ maxWidth: '25em' }}>
                <Card>
                  <CardContent>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{ textAlign: 'center' }}
                          className={classes.subHeader}
                        >
                          Banking card's information:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <span className={classes.subHeader}>
                            Card number:
                          </span>
                          &nbsp;{profileTeacher.cardNumber}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <span className={classes.subHeader}>
                            Name on card:
                          </span>
                          &nbsp;{profileTeacher.nameOnCard}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">
                          <span className={classes.subHeader}>
                            Bank's name:
                          </span>
                          &nbsp;{profileTeacher.bankName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}

          {profileTeacher &&
            profileTeacher.video !== null &&
            profileTeacher.thumbnail !== null && (
              <Grid
                item
                container
                direction="column"
                justify="center"
                style={{ width: matchesLG ? '60%' : undefined }}
              >
                <Grid item>
                  <Typography variant="body1" className={classes.subHeader}>
                    Video introduction:
                  </Typography>
                </Grid>
                <Grid item style={{ width: '100%' }}>
                  {profileTeacher && profileTeacher.video && (
                    <div className="player-wrapper">
                      <ReactPlayer
                        className="react-player"
                        url={`/${profileTeacher.video}`}
                        controls
                        playing
                        light={`/${profileTeacher.thumbnail}`}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
            )}

          {profileTeacher &&
            profileTeacher.degreeImages &&
            profileTeacher.degreeImages.length > 0 &&
            profileTeacher.typeOfTeacher !== 'commutor' && (
              <Grid item direction="column" justify="center">
                <Grid item>
                  <Typography variant="body1" className={classes.subHeader}>
                    Images of teaching certificates:
                  </Typography>
                </Grid>

                <Grid
                  item
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                  style={{ width: '100%', margin: '0' }}
                >
                  {renderImages(profileTeacher.degreeImages)}
                </Grid>
              </Grid>
            )}

          {profileTeacher &&
            profileTeacher.expImages &&
            profileTeacher.expImages.length > 0 &&
            profileTeacher.typeOfTeacher !== 'commutor' && (
              <Grid item>
                <Typography variant="body1" className={classes.subHeader}>
                  Images of teaching experiences:
                </Typography>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                  style={{ width: '100%', margin: '0' }}
                >
                  {renderImages(profileTeacher.expImages)}
                </Grid>
              </Grid>
            )}

          <Grid item>
            <Reviews />
          </Grid>
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
