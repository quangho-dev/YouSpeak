import React, { useEffect } from 'react'
import {
  Typography,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { getBookedLessons } from '../../../actions/bookingCalendarStudent'
import Spinner from '../../ui/Spinner'
import MyButton from '../../ui/MyButton'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { Link } from 'react-router-dom'

const LessonsManager = ({
  bookingCalendarStudent: { bookedLessons, loading, bookedTime },
  getBookedLessons,
}) => {
  useEffect(() => {
    getBookedLessons()
  }, [getBookedLessons])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      className="container"
      style={{ padding: '2em 3em' }}
    >
      <Grid item>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
        >
          Quản lý bài học
        </Typography>
      </Grid>
      <Grid item>
        {loading ? (
          <Spinner />
        ) : !(bookedLessons.length > 0) ? (
          <Typography variant="body1">Chưa có bài học nào được đặt.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên bài học</TableCell>
                  <TableCell>Giáo viên</TableCell>
                  {/* <TableCell>Skype Id</TableCell>
                  <TableCell>Số điện thoại</TableCell> */}
                  <TableCell align="center">Xem thêm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookedLessons &&
                  bookedLessons.length > 0 &&
                  bookedLessons.map((lesson, index) => (
                    <TableRow
                      key={lesson._id}
                      style={
                        index % 2
                          ? { background: '#F3F5F7' }
                          : { background: 'white' }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{lesson.lesson.lessonName}</TableCell>
                      <TableCell>{lesson.teacher.name}</TableCell>
                      <TableCell>
                        <MyButton
                          component={Link}
                          to={`/students/bookedLesson/${lesson._id}`}
                        >
                          <Grid container justify="center" alignItems="center">
                            <Grid item>
                              <FindInPageIcon />
                            </Grid>

                            <Grid item>
                              <Typography
                                variant="body2"
                                style={{ fontWeight: '500' }}
                              >
                                &nbsp;Xem thêm
                              </Typography>
                            </Grid>
                          </Grid>
                        </MyButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  bookingCalendarStudent: state.bookingCalendarStudent,
})

export default connect(mapStateToProps, { getBookedLessons })(LessonsManager)
