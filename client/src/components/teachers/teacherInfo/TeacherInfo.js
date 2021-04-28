import React, { useState, useEffect } from 'react'
import { Grid, Typography, Avatar, Card, CardContent } from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import { getProfileTeacherById } from '../../../actions/profileTeacher'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import Spinner from '../../ui/Spinner'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ShowMoreText from 'react-show-more-text'
import getMinPeriodPrice from '../../../utils/getMinPeriodPrice'
import formatMoney from '../../../utils/formatMoney'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
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
          className="container"
        >
          <Grid item>
            <Typography
              variant="h4"
              style={{
                textTransform: 'uppercase',
                marginBottom: '1em',
                fontWeight: '500',
              }}
            >
              Thông tin về giáo viên:
            </Typography>
          </Grid>

          <Grid item container justify="center">
            <Grid item style={{ margin: '0 3em 2em 0' }}>
              {profileTeacher.video && (
                <ReactPlayer
                  url={`/${profileTeacher.video}`}
                  controls
                  playing
                  light={`/${profileTeacher.thumbnail}`}
                />
              )}
            </Grid>

            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ marginBottom: '2em' }}>
                  <Card>
                    <CardContent>
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        spacing={2}
                      >
                        <Grid item>
                          <Typography variant="h6">
                            Giá thấp nhất từ:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body1">
                            {profileTeacher &&
                              profileTeacher.lessons !== undefined &&
                              profileTeacher.lessons.length > 0 &&
                              formatMoney(
                                Math.min(
                                  ...profileTeacher.lessons.map(
                                    (lesson) =>
                                      lesson &&
                                      lesson.periods.length > 0 &&
                                      lesson.periods[0] &&
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
                            style={{ fontWeight: '700', color: 'white' }}
                          >
                            Đặt lịch học
                          </MyButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid item>
                <Card>
                  <CardContent>
                    <Grid container direction="column" alignItems="center">
                      <Grid item>
                        <Typography variant="h6">Các kiểu bài học:</Typography>
                      </Grid>
                      {profileTeacher.lessons.length > 0 &&
                        profileTeacher.lessons.map((lesson, index) => (
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
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.marginBottom}>
            <Card style={{ padding: '2em' }}>
              <CardContent>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={4}
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
                    <Grid container direction="column" spacing={2}>
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
                        {profileTeacher.hometown && (
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

          <Grid item style={{ width: '100%' }}>
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
