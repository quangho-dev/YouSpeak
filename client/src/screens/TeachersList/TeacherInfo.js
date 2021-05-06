import React from 'react'
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ReactPlayer from 'react-player'
import formatMoney from '../../utils/formatMoney'
import { Link as RouterLink } from 'react-router-dom'
import getMinPeriodPrice from '../../utils/getMinPeriodPrice'
import './ReactPlayer.css'
import DateRangeIcon from '@material-ui/icons/DateRange'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({
  marginBottom: {
    marginBottom: '1em',
  },
  subHeader: {
    fontSize: '15px',
  },
  teacherAvatar: {
    width: '70px',
    height: '70px',
  },
  container: {
    backgroundColor: 'white',
  },
}))

const TeacherInfo = ({ teacher }) => {
  const {
    teacherAvatar,
    typeOfTeacher,
    video,
    thumbnail,
    user,
    hometown,
    lessons,
  } = teacher

  const classes = useStyles()
  const theme = useTheme()

  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  const arrayOfLessonsPeriodsMinPrice = lessons.map((lesson) =>
    getMinPeriodPrice(lesson.periods[0])
  )

  return (
    <Card
      style={{
        margin: '0 auto 3em',
        maxWidth: matchesLG ? '60%' : matchesSM ? '70%' : undefined,
      }}
    >
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ width: '100%' }}>
          {video && (
            <div className="player-wrapper">
              <ReactPlayer
                className="react-player"
                url={`/${video}`}
                controls
                playing
                light={`/${thumbnail}`}
                width="100%"
                height="100%"
              />
            </div>
          )}
        </Grid>

        <Grid
          item
          container
          justify="space-around"
          alignItems="center"
          style={{ padding: '2em 2em' }}
        >
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Grid item className={classes.marginBottom}>
                {teacherAvatar && (
                  <Avatar
                    alt="teacher-avatar"
                    src={teacherAvatar}
                    className={classes.teacherAvatar}
                  />
                )}
              </Grid>

              <Grid item className={classes.marginBottom}>
                {user && (
                  <Button
                    component={RouterLink}
                    to={`/book-learning-time/${user._id}`}
                    variant="contained"
                    disableRipple
                    color="primary"
                    style={{
                      color: 'white',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      background: '#b30000',
                    }}
                  >
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <DateRangeIcon />
                        &nbsp;
                      </Grid>
                      <Grid item>Đặt lịch học</Grid>
                    </Grid>
                  </Button>
                )}
              </Grid>

              <Grid item className={classes.marginBottom}>
                {user && (
                  <Button
                    component={RouterLink}
                    to={`/teachers/${teacher.user._id}`}
                    variant="contained"
                    disableRipple
                    color="primary"
                    style={{
                      color: 'white',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                    }}
                  >
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <SearchIcon />
                        &nbsp;
                      </Grid>
                      <Grid item>Xem thêm</Grid>
                    </Grid>
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column" justify="center">
              <Grid item>
                {user && user.name && (
                  <Typography variant="h6">{user.name}</Typography>
                )}
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  {typeOfTeacher === 'professional'
                    ? 'Giáo viên chuyên nghiệp'
                    : 'Giáo viên cộng đồng'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" justify="center">
              <Grid item>
                <Typography variant="h6" className={classes.subHeader}>
                  Đến từ:
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">&nbsp;{hometown.label}</Typography>
              </Grid>

              <Grid item container direction="column">
                {lessons.length > 0 && (
                  <>
                    <Grid item>
                      <Typography variant="h6" className={classes.subHeader}>
                        Học phí từ:
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        {formatMoney(
                          Math.min(...arrayOfLessonsPeriodsMinPrice)
                        )}
                        &nbsp;VNĐ
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default TeacherInfo
