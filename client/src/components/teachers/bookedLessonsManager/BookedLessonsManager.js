import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { getBookedLessonsOfATeacher } from '../../../actions/bookingCalendarStudent'
import Spinner from '../../ui/Spinner'
import BookedLessonsTable from './BookedLessonsTable'

const BookedLessonsManager = ({
  bookingCalendarStudent: { bookedLessons, loading },
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
      style={{ width: '100%', margin: '0' }}
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
  bookingCalendarStudent: state.bookingCalendarStudent,
  auth: state.auth,
})

export default connect(mapStateToProps, { getBookedLessonsOfATeacher })(
  BookedLessonsManager
)
