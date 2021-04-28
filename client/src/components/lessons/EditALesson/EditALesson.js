import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from 'formik-material-ui'
import Spinner from '../../ui/Spinner'
import LessonPeriodForm from './LessonPeriodForm'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import { getLessonById, createOrUpdateALesson } from '../../../actions/lessons'
import EditDocuments from './EditDocuments'

const useStyles = makeStyles((theme) => ({
  bottomGutterFormControl: {
    marginBottom: '1.5em',
  },
  controlFormHeader: {
    fontWeight: '500',
    fontSize: '18px',
  },
  paddingContainer: {
    padding: '0 2em',
  },
}))

const EditALesson = (props) => {
  const [formValues, setFormValues] = useState(null)

  const lessonId = props.match.params.id

  const classes = useStyles()

  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)
  const { lesson: singleLesson, loading } = lesson

  const validationSchema = yup.object().shape({
    lessonName: yup.string().required("Lesson's name is required."),
    content: yup.string().nullable(true).required('Content is required.'),
    documents: yup.array(),
    periods: yup.array(),
  })

  const initialValues = {
    lessonName: '',
    content: '',
    documents: [],
    periods: [
      {
        thirtyMinutes: { isChosen: false, price: 0 },
        fortyFiveMinutes: { isChosen: false, price: 0 },
        oneHour: { isChosen: false, price: 0 },
      },
    ],
  }

  useEffect(() => {
    if (!singleLesson || singleLesson._id !== lessonId) {
      dispatch(getLessonById(lessonId))
    } else if (!loading || singleLesson) {
      setFormValues(singleLesson)
    }
  }, [dispatch, lessonId, singleLesson, loading])

  if (loading) {
    return <Spinner />
  }

  const onSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch(createOrUpdateALesson(lessonId, values))
      setSubmitting(false)
      props.history.push('/teachers/lessons')
    }, 500)
  }

  return (
    <Formik
      enableReinitialize
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, isValid, values, errors, setFieldValue, dirty }) => (
        <Form>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.paddingContainer}
          >
            <Grid item>
              <Typography
                variant="h4"
                style={{
                  margin: '1em 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Edit type of lesson
              </Typography>
            </Grid>

            <Grid item container justify="center" spacing={5}>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Grid item className={classes.bottomGutterFormControl}>
                    <Field
                      fullWidth
                      name="lessonName"
                      component={TextField}
                      label="Lesson's name"
                      style={{ width: '30em' }}
                    />
                  </Grid>
                  <Grid item className={classes.bottomGutterFormControl}>
                    <Field
                      fullWidth
                      multiline
                      rows={6}
                      name="content"
                      component={TextField}
                      label="Content"
                      style={{ width: '30em' }}
                    />
                  </Grid>
                  <EditDocuments />
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Grid item>
                    <Typography
                      variant="h6"
                      className={classes.controlFormHeader}
                    >
                      Lesson's duration:
                    </Typography>
                  </Grid>
                  <Grid item container spacing={1}>
                    {values.periods && (
                      <LessonPeriodForm
                        fieldCheckbox="periods[0].thirtyMinutes.isChosen"
                        label="30 minutes"
                        valueCheckbox={values.periods[0].thirtyMinutes.isChosen}
                        fieldPrice="periods[0].thirtyMinutes.price"
                        valuePrice={values.periods[0].thirtyMinutes.price}
                      />
                    )}
                    {values.periods && (
                      <LessonPeriodForm
                        fieldCheckbox="periods[0].fortyFiveMinutes.isChosen"
                        label="45 minutes"
                        valueCheckbox={
                          values.periods[0].fortyFiveMinutes.isChosen
                        }
                        fieldPrice="periods[0].fortyFiveMinutes.price"
                        valuePrice={values.periods[0].fortyFiveMinutes.price}
                      />
                    )}

                    {values.periods && (
                      <LessonPeriodForm
                        fieldCheckbox="periods[0].oneHour.isChosen"
                        label="1 hour"
                        valueCheckbox={values.periods[0].oneHour.isChosen}
                        fieldPrice="periods[0].oneHour.price"
                        valuePrice={values.periods[0].oneHour.price}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify="center"
              spacing={1}
              style={{ margin: '1em 0' }}
            >
              <Grid item>
                <MyButton component={Link} to="/teachers/lessons">
                  <ArrowBackIcon />
                  &nbsp;Back
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton disabled={!isValid || isSubmitting} type="submit">
                  <AddIcon />
                  &nbsp;Confirm
                </MyButton>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default EditALesson
