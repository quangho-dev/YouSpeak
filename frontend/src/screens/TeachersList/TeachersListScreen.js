import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { getTeachers } from '../../actions/teachersList'
import TeacherInfo from './TeacherInfo'
import Spinner from '../../components/ui/Spinner'
import { connect } from 'react-redux'
import { getLessonsOfTeacherById } from '../../actions/lessons'
import PropTypes from 'prop-types'

const TeachersListScreen = ({
  getLessonsOfTeacherById,
  getTeachers,
  lesson: { loading, lessons },
  teachersList: { teachersList: teachers, loading: loadingTeachersList },
}) => {
  const [visible, setVisible] = useState(10)

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
      className="container"
      spacing={1}
      style={{ width: '100%', margin: 0 }}
    >
      <Grid item style={{ margin: '1em 0 2.5em' }}>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
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
          style={{ color: 'white', margin: '2em 0' }}
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
  lesson: state.lesson,
  teachersList: state.teachersList,
})

export default connect(mapStateToProps, {
  getLessonsOfTeacherById,
  getTeachers,
})(TeachersListScreen)
