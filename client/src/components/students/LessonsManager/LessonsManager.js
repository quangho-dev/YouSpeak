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
import { getBookedLessons } from '../../../actions/learningScheduleForStudent'
import Spinner from '../../ui/Spinner'
import MyButton from '../../ui/MyButton'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import './table.css'

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
}))

const LessonsManager = ({
  learningScheduleForStudent: { bookedLessons, loading, bookedTime },
  getBookedLessons,
}) => {
  const classes = useStyles()

  useEffect(() => {
    getBookedLessons()
  }, [getBookedLessons])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.rowContainer}
      style={{ marginTop: '7em' }}
    >
      <Grid item>
        <Typography
          variant="h4"
          style={{
            textTransform: 'uppercase',
            fontWeight: '500',
            marginBottom: '1em',
          }}
        >
          Quản lý bài học
        </Typography>
      </Grid>
      <Grid>
        {loading ? (
          <Spinner />
        ) : !(bookedLessons.length > 0) ? (
          <Typography variant="body1">Chưa có bài học nào được đặt.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên bài học</TableCell>
                  <TableCell>Giáo viên</TableCell>
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
                      <TableCell>
                        {lesson && lesson.lesson && lesson.lesson.lessonName}
                      </TableCell>
                      <TableCell>
                        {lesson && lesson.teacher && lesson.teacher.name}
                      </TableCell>
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
  learningScheduleForStudent: state.learningScheduleForStudent,
})

export default connect(mapStateToProps, { getBookedLessons })(LessonsManager)
