import React from 'react'
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MyButton from '../../ui/MyButton'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import convertMillisecondsToMinutes from '../../../utils/convertMillisecondsToMinutes'
import moment from 'moment'

const BookedLessonsTable = ({ bookedLessons }) => {
  return (
    <Paper style={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Student's name</TableCell>
            <TableCell>Type of lesson</TableCell>
            <TableCell>Starting time</TableCell>
            <TableCell>Lesson's duration</TableCell>
            <TableCell>State</TableCell>
            <TableCell>{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookedLessons &&
            bookedLessons.length > 0 &&
            bookedLessons.map((lesson, index) => (
              <TableRow key={lesson._id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{lesson.user.name}</TableCell>
                <TableCell>{lesson.lesson.lessonName}</TableCell>
                <TableCell>
                  {moment(lesson.bookedTime[0].start)
                    .locale('en')
                    .format('HH[:]mm, MMMM DD, YYYY')}
                </TableCell>
                <TableCell>
                  {convertMillisecondsToMinutes(lesson.duration)}&nbsp;minutes
                </TableCell>
                <TableCell>
                  {lesson.isConfirmed ? 'Confirmed' : 'Waiting to be confirmed'}
                </TableCell>
                <TableCell>
                  <MyButton
                    component={Link}
                    to={`/teachers/bookedLesson/${lesson._id}`}
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
                          &nbsp;Watch details
                        </Typography>
                      </Grid>
                    </Grid>
                  </MyButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default BookedLessonsTable
