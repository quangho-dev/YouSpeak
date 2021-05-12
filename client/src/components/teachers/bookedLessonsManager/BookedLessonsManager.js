import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { getBookedLessonsOfATeacher } from '../../../actions/learningScheduleForStudent'
import Spinner from '../../ui/Spinner'
import BookedLessonsTable from './BookedLessonsTable'

const BookedLessonsManager = ({
  learningScheduleForStudent: { bookedLessons, loading },
  auth: { user },
  getBookedLessonsOfATeacher,
}) => {
  useEffect(() => {
    getBookedLessonsOfATeacher(user._id)
  }, [getBookedLessonsOfATeacher, user._id])
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      className="container"
    >
      <Grid item>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
        >
          Order manager
        </Typography>
      </Grid>

      <Grid item>
        {loading ? (
          <Spinner />
        ) : bookedLessons.length === 0 ? (
          <Typography variant="body1">There are no orders.</Typography>
        ) : (
          <BookedLessonsTable bookedLessons={bookedLessons} />
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  learningScheduleForStudent: state.learningScheduleForStudent,
  auth: state.auth,
})

export default connect(mapStateToProps, { getBookedLessonsOfATeacher })(
  BookedLessonsManager
)
