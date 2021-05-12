import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getLessons } from '../../actions/typeOfLesson'
import LessonTable from './LessonTable'
import { Link } from 'react-router-dom'
import MyButton from '../ui/MyButton'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Spinner from '../ui/Spinner'
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

const Lessons = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const typeOfLesson = useSelector((state) => state.typeOfLesson)

  const { lessons, loading } = typeOfLesson

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
        justify="center"
        className={classes.rowContainer}
        style={{ width: '100%', margin: '7em 0 0' }}
        spacing={2}
      >
        <Grid item>
          <Typography
            variant="h4"
            style={{ textTransform: 'uppercase', fontWeight: '500' }}
          >
            Type Of Lesson Manager
          </Typography>
        </Grid>
        <Grid item>
          {lessons && lessons.length > 0 ? (
            <LessonTable lessons={lessons} />
          ) : (
            <Typography variant="body1">
              There aren't any type of lesson yet, please add some.
            </Typography>
          )}
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{ margin: '0', width: '100%' }}
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
