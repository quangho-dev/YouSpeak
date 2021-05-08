import React from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import ShowTeacherAvailableTimeCalendar from './ShowTeacherAvailableTimeCalendar'
import LessonList from './LessonList'
import Spinner from '../../ui/Spinner'

const ChooseLesson = ({
  currentTeacher,
  lessonListState,
  calendarEvents,
  loading,
  loadingLessons,
  nextPage,
}) => {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid item container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography
          variant="h4"
          style={{ textAlign: 'center', fontWeight: '600' }}
        >
          Chọn kiểu bài học
        </Typography>
      </Grid>
      <Grid item>
        {currentTeacher && (
          <Typography variant="h6">{currentTeacher.name}</Typography>
        )}
      </Grid>

      <Grid item>
        {loadingLessons ? (
          <Spinner />
        ) : (
          <LessonList lessons={lessonListState} nextPage={nextPage} />
        )}
      </Grid>

      {matchesMD && (
        <Grid item container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <Typography variant="h5" style={{ fontWeight: '500' }}>
              Lịch của giáo viên:
            </Typography>
          </Grid>
          <Grid item>
            {loading ? (
              <Spinner />
            ) : (
              <ShowTeacherAvailableTimeCalendar
                calendarEvents={calendarEvents}
              />
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default ChooseLesson
