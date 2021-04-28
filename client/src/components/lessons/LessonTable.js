import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MyButton from '../ui/MyButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'
import { deleteLesson } from '../../actions/lessons'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const LessonTable = ({ lessons }) => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const confirm = useConfirm()

  const handleDeleteClick = (lessonId) => {
    confirm({
      description: 'Nhấn đồng ý sẽ xóa dữ liệu.',
      title: 'Bạn có chắc không?',
    })
      .then(() => {
        dispatch(deleteLesson(lessonId))
      })
      .catch(() => {})
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="jlessons table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Type of lesson</TableCell>
            <TableCell align="right">Content</TableCell>
            <TableCell align="right">{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons &&
            lessons.map((lesson, indexLesson) => (
              <TableRow
                style={
                  indexLesson % 2
                    ? { background: '#F3F5F7' }
                    : { background: 'white' }
                }
                key={lesson._id}
              >
                <TableCell component="th" scope="row" align="center">
                  {indexLesson + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {lesson && lesson.lessonName && lesson.lessonName}
                </TableCell>
                <TableCell align="right">{lesson.content}</TableCell>
                <TableCell align="right">
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <MyButton
                        component={Link}
                        to={`/teachers/lessons/edit/${lesson._id}`}
                      >
                        <EditIcon />
                        &nbsp;Edit
                      </MyButton>
                    </Grid>
                    <Grid item>
                      <MyButton onClick={() => handleDeleteClick(lesson._id)}>
                        <DeleteIcon />
                        &nbsp;Delete
                      </MyButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LessonTable
