import React, { useState, useEffect } from 'react'
import { Grid, Stepper, Step, StepLabel, Dialog } from '@material-ui/core'
import { getAvailableTimeOfATeacher } from '../../../actions/bookingCalendar'
import { getLessonsOfTeacherById } from '../../../actions/lessons'
import { Link } from 'react-router-dom'
import MyButton from '../../ui/MyButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Formik, Form } from 'formik'
import ChooseLesson from './ChooseLesson'
import ChooseDuration from './ChooseDuration'
import { bookTime } from '../../../actions/bookingCalendarStudent'
import ChooseTime from './ChooseTime'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import ChoosePaymentMethod from './ChoosePaymentMethod'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '3em',
  },
}))

const BookLearningTime = ({
  bookingCalendar: { availableTime, loading, currentTeacher },
  lesson: { lessons, loading: loadingLessons },
  getAvailableTimeOfATeacher,
  getLessonsOfTeacherById,
  bookTime,
  match,
  history,
}) => {
  const [page, setPage] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const classes = useStyles()

  const teacherCalendarId = match.params.teacherCalendarId

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
    handleNext()
  }

  const prevPage = () => {
    setPage(page - 1)
    handleBack()
  }

  const initialValues = {
    lesson: '',
    teacher: teacherCalendarId,
    duration: 0,
    bookedTime: [{ start: null, end: null, title: 'Booked time' }],
    price: 0,
    id1: '',
    id2: '',
  }

  const pages = [
    <ChooseLesson
      nextPage={nextPage}
      currentTeacher={currentTeacher}
      lessonListState={lessons}
      calendarEvents={availableTime}
      loading={loading}
      loadingLessons={loadingLessons}
    />,
    <ChooseDuration
      nextPage={nextPage}
      prevPage={prevPage}
      lessonListState={lessons}
    />,
    <ChooseTime
      nextPage={nextPage}
      prevPage={prevPage}
      calendarEvents={availableTime}
    />,
    <ChoosePaymentMethod />,
  ]

  useEffect(() => {
    getAvailableTimeOfATeacher(teacherCalendarId)
    getLessonsOfTeacherById(teacherCalendarId)
  }, [teacherCalendarId, getAvailableTimeOfATeacher, getLessonsOfTeacherById])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        bookTime(values)
      }}
    >
      {({ isValid, isSubmitting, values, errors }) => (
        <Dialog open fullWidth maxWidth="lg">
          <Form autoComplete="off">
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ padding: '2em 3em', backgroundColor: '#F0F2F5' }}
              spacing={1}
              className={classes.container}
            >
              <Grid item style={{ alignSelf: 'flex-start' }}>
                {page === 0 ? (
                  <MyButton component={Link} to="/teachers/english">
                    <ArrowBackIcon />
                    &nbsp;Trở về danh sách giáo viên
                  </MyButton>
                ) : (
                  <MyButton onClick={() => prevPage()}>
                    <ArrowBackIcon />
                    &nbsp;Trở về bước trước
                  </MyButton>
                )}
              </Grid>

              <Grid item style={{ width: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  style={{ backgroundColor: '#F0F2F5' }}
                  alternativeLabel
                >
                  <Step>
                    <StepLabel>Chọn bài học</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Chọn thời lượng của bài học</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Đặt lịch</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Chọn phương thức thanh toán</StepLabel>
                  </Step>
                </Stepper>
              </Grid>

              {pages[page]}
            </Grid>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

const mapStateToProps = (state) => ({
  bookingCalendar: state.bookingCalendar,
  lesson: state.lesson,
})

export default connect(mapStateToProps, {
  getAvailableTimeOfATeacher,
  getLessonsOfTeacherById,
  bookTime,
})(BookLearningTime)
