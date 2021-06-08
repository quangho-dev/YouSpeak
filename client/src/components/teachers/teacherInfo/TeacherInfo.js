import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  useMediaQuery,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import { getProfileTeacherById } from '../../../actions/profileTeacher'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import Spinner from '../../ui/Spinner'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ShowMoreText from 'react-show-more-text'
import getMinPeriodPrice from '../../../utils/getMinPeriodPrice'
import formatMoney from '../../../utils/formatMoney'
import { Link } from 'react-router-dom'
import './ReactPlayer.css'
import DateRangeIcon from '@material-ui/icons/DateRange'
import Reviews from './Reviews'

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
  marginBottom: {
    marginBottom: '2em',
  },
  subHeader: {
    fontSize: '15px',
  },
  teacherAvatar: {
    width: '100px',
    height: '100px',
  },
  container: {
    backgroundColor: 'white',
  },
  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: '0',
    top: '0',
    zIndex: 10,
    padding: '0 4em',
  },
}))

const TeacherInfo = ({
  match,
  profileTeacher: { profileTeacher, loading },
  getProfileTeacherById,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const classes = useStyles()

  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  const executeOnClick = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    getProfileTeacherById(match.params.teacherProfileId)
  }, [getProfileTeacherById, match.params.teacherProfileId])

  return (
    <>
      {loading || profileTeacher === null ? (
        <Spinner />
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.rowContainer}
          spacing={3}
          style={{ margin: '7em 0 2em', width: '100%' }}
        >
          <Grid item>
            <Typography
              variant={matchesMD ? 'h4' : 'h5'}
              style={{
                textTransform: 'uppercase',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Thông tin về giáo viên
            </Typography>
          </Grid>

          <Grid item style={{ minWidth: matchesMD ? '60%' : '100%' }}>
            {profileTeacher.video && (
              <div className="player-wrapper">
                <ReactPlayer
                  url={`/${profileTeacher.video}`}
                  controls
                  playing
                  light={`/${profileTeacher.thumbnail}`}
                  width="100%"
                  height="100%"
                  className="react-player"
                />
              </div>
            )}
          </Grid>

          <Grid
            item
            container
            direction={matchesMD ? 'row' : 'column'}
            alignItems="center"
            justify="center"
            spacing={3}
          >
            <Grid item>
              {profileTeacher &&
                profileTeacher.lessons &&
                profileTeacher.lessons.length > 0 && (
                  <Card>
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        spacing={1}
                      >
                        <Grid item>
                          <Typography variant="h6">
                            Giá thấp nhất từ:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">
                            {formatMoney(
                              Math.min(
                                ...profileTeacher.lessons.map(
                                  (lesson) =>
                                    lesson &&
                                    lesson.periods &&
                                    lesson.periods.length > 0 &&
                                    getMinPeriodPrice(lesson.periods[0])
                                )
                              )
                            )}
                            &nbsp;VNĐ
                          </Typography>
                        </Grid>
                        <Grid item>
                          <MyButton
                            component={Link}
                            to={`/book-learning-time/${profileTeacher.user._id}`}
                            style={{
                              fontWeight: '700',
                              color: 'white',
                              background: '#b30000',
                            }}
                          >
                            <DateRangeIcon />
                            &nbsp;Đặt lịch học
                          </MyButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                )}
            </Grid>

            <Grid item>
              {profileTeacher.lessons.length > 0 && (
                <Card>
                  <CardContent>
                    <Grid container direction="column" justify="center">
                      <Grid item>
                        <Typography variant="h6">Các kiểu bài học:</Typography>
                      </Grid>
                      {profileTeacher.lessons.map((lesson, index) => (
                        <Grid item key={index}>
                          <Typography variant="body1">
                            {index + 1}.&nbsp;
                            {lesson.lessonName}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>

          <Grid item>
            <Card style={{ padding: '2em' }}>
              <CardContent>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                  style={{ margin: '0', width: '100%' }}
                >
                  <Grid item>
                    {profileTeacher.teacherAvatar && (
                      <Avatar
                        alt="teacher-avatar"
                        src={profileTeacher.teacherAvatar}
                        className={classes.teacherAvatar}
                      />
                    )}
                  </Grid>

                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        {profileTeacher.user.name && (
                          <Typography variant="h6">
                            {profileTeacher.user.name}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item>
                        {profileTeacher.typeOfTeacher && (
                          <Typography variant="body1">
                            {profileTeacher.typeOfTeacher === 'professional'
                              ? 'Giáo viên chuyên nghiệp'
                              : 'Giáo viên cộng đồng'}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item>
                        {profileTeacher &&
                          profileTeacher.hometown &&
                          profileTeacher.hometown.label && (
                            <Typography variant="body1">
                              <strong>Đến từ:</strong>&nbsp;
                              {profileTeacher.hometown.label}
                            </Typography>
                          )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item style={{ maxWidth: matchesMD ? '80%' : undefined }}>
            <Card>
              <CardContent>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="h6">
                      Giới thiệu về giáo viên:
                    </Typography>
                  </Grid>
                  <Grid item>
                    {profileTeacher.introduction && (
                      <ShowMoreText
                        lines={3}
                        more="Xem thêm"
                        less="Thu lại"
                        onClick={executeOnClick}
                        expanded={isExpanded}
                        width={600}
                      >
                        <Typography variant="body1">
                          {profileTeacher.introduction}
                        </Typography>
                      </ShowMoreText>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Reviews teacherId={match.params.teacherProfileId} />
          </Grid>
        </Grid>
      )}
    </>
  )
}

TeacherInfo.propTypes = {
  getProfileTeacherById: PropTypes.func.isRequired,
  profileTeacher: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profileTeacher: state.profileTeacher,
})

export default connect(mapStateToProps, { getProfileTeacherById })(TeacherInfo)
