import React from 'react'
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Button,
  Box,
  CardActionArea,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ReactPlayer from 'react-player'
import formatMoney from '../../utils/formatMoney'
import { Link as RouterLink } from 'react-router-dom'
import getMinPeriodPrice from '../../utils/getMinPeriodPrice'

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

  const arrayOfLessonsPeriodsMinPrice = lessons.map((lesson) =>
    getMinPeriodPrice(lesson.periods[0])
  )

  return (
    <Card>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={6}>
          <CardActionArea
            component={RouterLink}
            to={`/teachers/${teacher.user._id}`}
          >
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: '5em 4em' }}
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
                        }}
                      >
                        Đặt lịch học
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container direction="column" justify="center">
                  <Grid item>
                    {user && user.name && (
                      <Typography variant="h5" style={{ fontSize: '26px' }}>
                        {user.name}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {typeOfTeacher === 'professional'
                        ? 'Giáo viên chuyên nghiệp'
                        : 'Giáo viên cộng đồng'}
                    </Typography>
                  </Grid>
                  <Grid item style={{ width: '3em' }}>
                    <Box borderBottom={1} borderColor="primary" />
                  </Grid>

                  <Grid
                    item
                    container
                    alignItems="center"
                    style={{ margin: '1.5em 0' }}
                  >
                    <Grid item>
                      <Typography variant="h6" className={classes.subHeader}>
                        Đến từ:
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="body1">
                        &nbsp;{hometown.label}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item container direction="column">
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardActionArea>
        </Grid>
        <Grid item xs={6}>
          {video && (
            <ReactPlayer
              url={`/${video}`}
              controls
              playing
              light={`/${thumbnail}`}
            />
          )}
        </Grid>
      </Grid>
    </Card>
  )
}

export default TeacherInfo
