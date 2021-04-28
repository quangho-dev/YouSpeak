import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { useDispatch } from 'react-redux'
import MyButton from '../../ui/MyButton'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from 'formik-material-ui'
import LessonPeriodForm from './LessonPeriodForm'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import { createALesson } from '../../../actions/lessons'
import AddDocuments from './AddDocuments'

const useStyles = makeStyles((theme) => ({
  bottomGutterFormControl: {
    marginBottom: '1.5em',
  },
  controlFormHeader: {
    fontWeight: '500',
    fontSize: '18px',
  },
}))

const AddALesson = (props) => {
  const classes = useStyles()

  const dispatch = useDispatch()

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

  const validationSchema = yup.object().shape({
    lessonName: yup.string().required('Vui lòng điền tên bài học.'),
    content: yup.string().required('Vui lòng điền nội dung của bài học.'),
    documents: yup.array(),
    periods: yup.array(),
  })

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(createALesson(values))

    props.history.push('/teachers/lessons')

    resetForm({
      lessonName: '',
      content: '',
      documents: [],
      periods: [
        { thirtyMinutes: { isChosen: false, price: 0 } },
        { fortyFiveMinutes: { isChosen: false, price: 0 } },
        { oneHour: { isChosen: false, price: 0 } },
      ],
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, values, dirty }) => (
        <Form>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography
                variant="h4"
                style={{
                  margin: '1em 0',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                }}
              >
                Add a type of lesson
              </Typography>
            </Grid>

            <Grid
              item
              className={classes.bottomGutterFormControl}
              style={{ width: '20em', marginBottom: '2em' }}
            >
              <Field
                fullWidth
                name="lessonName"
                component={TextField}
                label="Lesson's name"
              />
            </Grid>
            <Grid
              item
              className={classes.bottomGutterFormControl}
              style={{ width: '20em', marginBottom: '2em' }}
            >
              <Field
                fullWidth
                name="content"
                component={TextField}
                multiline
                rows={4}
                label="Lesson's content"
              />
            </Grid>

            <AddDocuments />

            <Grid item style={{ marginBottom: '2em' }}>
              <Typography variant="h6" className={classes.controlFormHeader}>
                Lesson's duration:
              </Typography>
            </Grid>
            <Grid
              item
              container
              justify="center"
              spacing={1}
              style={{ width: '100%', margin: 0 }}
            >
              <Grid item>
                <LessonPeriodForm
                  fieldCheckbox="periods[0].thirtyMinutes.isChosen"
                  labelCheckbox="30 minutes"
                  valueCheckbox={values.periods[0].thirtyMinutes.isChosen}
                  fieldPrice="periods[0].thirtyMinutes.price"
                  valuePrice={values.periods[0].thirtyMinutes.price}
                />
              </Grid>

              <Grid item>
                <LessonPeriodForm
                  fieldCheckbox="periods[0].fortyFiveMinutes.isChosen"
                  labelCheckbox="45 minutes"
                  valueCheckbox={values.periods[0].fortyFiveMinutes.isChosen}
                  fieldPrice="periods[0].fortyFiveMinutes.price"
                  valuePrice={values.periods[0].fortyFiveMinutes.price}
                />
              </Grid>

              <Grid item>
                <LessonPeriodForm
                  fieldCheckbox="periods[0].oneHour.isChosen"
                  labelCheckbox="1 hour"
                  valueCheckbox={values.periods[0].oneHour.isChosen}
                  fieldPrice="periods[0].oneHour.price"
                  valuePrice={values.periods[0].oneHour.price}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              justify="center"
              spacing={1}
              style={{ margin: '1em 0', width: '100%' }}
              className={classes.bottomGutterFormControl}
            >
              <Grid item>
                <MyButton component={Link} to="/teachers/lessons">
                  <ArrowBackIcon />
                  &nbsp;Back
                </MyButton>
              </Grid>
              <Grid item>
                <MyButton type="submit" disabled={!(isValid && dirty)}>
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

export default AddALesson
