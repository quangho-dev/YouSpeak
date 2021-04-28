import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getLessons } from '../../actions/lessons'
import LessonTable from './LessonTable'
import { Link } from 'react-router-dom'
import MyButton from '../ui/MyButton'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Spinner from '../ui/Spinner'

const Lessons = () => {
  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)

  const { lessons, loading } = lesson

  useEffect(() => {
    dispatch(getLessons())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        className="container"
        style={{ width: '100%', margin: 0 }}
      >
        <Grid item>
          <Typography
            variant="h4"
            style={{ textTransform: 'uppercase', fontWeight: '500' }}
          >
            Type Of Lesson Manager
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: '1em' }}>
          <LessonTable lessons={lessons} />
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{ marginTop: '1em' }}
          spacing={3}
        >
          <Grid item>
            <MyButton component={Link} to="/teachers/dashboard">
              <ArrowBackIcon />
              &nbsp; Back to dashboard
            </MyButton>
          </Grid>
          <Grid item>
            <MyButton component={Link} to="/teachers/add-a-lesson">
              <AddIcon />
              &nbsp; Add a type of lesson
            </MyButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Lessons
