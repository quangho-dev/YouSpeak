import api from '../utils/api'
import {
  BOOK_TIME_SUCCESS,
  BOOK_TIME_ERROR,
  CANCEL_BOOKED_LESSON_SUCCESS,
  CANCEL_BOOKED_LESSON_ERROR,
  GET_ALL_BOOKED_LESSONS_SUCCESS,
  GET_ALL_BOOKED_LESSONS_ERROR,
  GET_BOOKED_LESSON_SUCCESS,
  GET_BOOKED_LESSON_ERROR,
  GET_BOOKED_LESSONS_OF_A_TEACHER_SUCCESS,
  GET_BOOKED_LESSONS_OF_A_TEACHER_ERROR,
  SYNC_ORDER_SUCCESS,
  SYNC_ORDER_ERROR,
} from './types'
import { toast } from 'react-toastify'
import { getProfileTeacherById } from './profileTeacher'
import { getProfileStudentById } from './profileStudent'

// Book time for learning
export const bookTime = (bookedTime) => async (dispatch) => {
  try {
    const res = await api.post('/learning-schedule-for-student', bookedTime)

    dispatch({
      type: BOOK_TIME_SUCCESS,
      payload: res.data,
    })

    toast.success('Bạn đã đặt lịch học thành công!')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => {
        toast.error(error.msg)
      })
    }

    dispatch({
      type: BOOK_TIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Cancel a booked lesson
export const cancelBookedLesson = (bookedLessonId) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/learning-schedule-for-student/cancel-booked-lesson/${bookedLessonId}`
    )

    dispatch({
      type: CANCEL_BOOKED_LESSON_SUCCESS,
      payload: {
        bookedLessonId,
        newTeacherAvailableTime: res.data.newTeacherAvailableTime,
      },
    })

    toast.info(res.data.msg)
  } catch (err) {
    dispatch({
      type: CANCEL_BOOKED_LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get all booked lessons
export const getBookedLessons = () => async (dispatch) => {
  try {
    const res = await api.get('/learning-schedule-for-student/bookedLessons')

    dispatch({
      type: GET_ALL_BOOKED_LESSONS_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ALL_BOOKED_LESSONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get booked lesson by id
export const getBookedLessonById = (bookedLessonId) => async (dispatch) => {
  try {
    const res = await api.get(
      `/learning-schedule-for-student/${bookedLessonId}`
    )

    dispatch({
      type: GET_BOOKED_LESSON_SUCCESS,
      payload: res.data,
    })

    return res.data
  } catch (err) {
    dispatch({
      type: GET_BOOKED_LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get all bookded lessons of a teacher
export const getBookedLessonsOfATeacher = (teacherId) => async (dispatch) => {
  try {
    const res = await api.get(`/teachers/${teacherId}/bookedLessons`)

    dispatch({
      type: GET_BOOKED_LESSONS_OF_A_TEACHER_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_BOOKED_LESSONS_OF_A_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const getBookedLessonAndProfileTeacher =
  (bookedLessonId) => async (dispatch) => {
    dispatch(getBookedLessonById(bookedLessonId)).then((res) =>
      dispatch(getProfileTeacherById(res.teacher))
    )
  }

export const getBookedLessonAndProfileStudent =
  (bookedLessonId) => async (dispatch) => {
    dispatch(getBookedLessonById(bookedLessonId)).then((res) =>
      dispatch(getProfileStudentById(res.user._id))
    )
  }

export const syncSuccessfulOrder = (app_trans_id) => async (dispatch) => {
  console.log('app_trans_id', app_trans_id)

  try {
    const res = await api.get(
      `/zaloPayment/sync-successful-order/${app_trans_id}`
    )

    dispatch({
      type: SYNC_ORDER_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SYNC_ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
