import React from 'react'
import { Grid, Typography } from '@material-ui/core'
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
  return (
    <>
      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h4">ĐẶT LỊCH HỌC VỚI GIÁO VIÊN</Typography>
      </Grid>
      <Grid item>
        {currentTeacher && (
          <Typography variant="h4">{currentTeacher.name}</Typography>
        )}
      </Grid>

      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h6">Chọn bài học:</Typography>
      </Grid>

      <Grid item>
        {loadingLessons ? (
          <Spinner />
        ) : (
          <LessonList lessons={lessonListState} nextPage={nextPage} />
        )}
      </Grid>

      <Grid item style={{ marginTop: '2em' }}>
        <Typography variant="h5">Lịch của giáo viên:</Typography>
      </Grid>
      <Grid item>
        {loading ? (
          <Spinner />
        ) : (
          <ShowTeacherAvailableTimeCalendar calendarEvents={calendarEvents} />
        )}
      </Grid>
    </>
  )
}

export default ChooseLesson
