import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { getTeachers } from '../../actions/teachersList'
import TeacherInfo from './TeacherInfo'
import Spinner from '../../components/ui/Spinner'
import { connect } from 'react-redux'
import { getLessonsOfTeacherById } from '../../actions/typeOfLesson'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

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

const TeachersListScreen = ({
  getLessonsOfTeacherById,
  getTeachers,
  typeOfLesson: { loading, lessons },
  teachersList: { teachersList: teachers, loading: loadingTeachersList },
}) => {
  const [visible, setVisible] = useState(10)
  const classes = useStyles()

  useEffect(() => {
    getTeachers()
  }, [getTeachers])

  const handleShowMoreTeachers = () => {
    setVisible((prevValue) => prevValue + 10)
  }

  if (loadingTeachersList) {
    return <Spinner />
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.rowContainer}
      spacing={1}
      style={{ width: '100%', margin: '7em 0 2em' }}
    >
      <Grid item style={{ margin: '1em 0 2.5em' }}>
        <Typography
          variant="h4"
          style={{
            textTransform: 'uppercase',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Tìm một giáo viên:
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        spacing={2}
        style={{ padding: '0' }}
      >
        {teachers &&
          teachers.slice(0, visible).map((teacher) => (
            <Grid
              item
              style={{ width: '100%', padding: '0' }}
              key={teacher._id}
            >
              <TeacherInfo teacher={teacher} />
            </Grid>
          ))}
      </Grid>

      <Grid item>
        <Button
          onClick={handleShowMoreTeachers}
          variant="contained"
          color="primary"
          style={{ color: 'white', margin: ' 0 0 2em' }}
          disableRipple
        >
          Hiển thị thêm
        </Button>
      </Grid>
    </Grid>
  )
}

TeachersListScreen.propTypes = {
  getLessonsOfTeacherById: PropTypes.func.isRequired,
  lesson: PropTypes.object.isRequired,
  teachersList: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  typeOfLesson: state.typeOfLesson,
  teachersList: state.teachersList,
})

export default connect(mapStateToProps, {
  getLessonsOfTeacherById,
  getTeachers,
})(TeachersListScreen)
