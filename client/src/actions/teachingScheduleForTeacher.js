import api from '../utils/api'
import {
  SET_AVAILABLE_TIME_SUCCESS,
  SET_AVAILABLE_TIME_ERROR,
  GET_CURRENT_AVAILABLE_TIME,
  GET_CURRENT_AVAILABLE_TIME_ERROR,
  GET_AVAILABLE_TIME_OF_TEACHER_SUCCESS,
  CONFIRM_BOOKED_LESSON_SUCCESS,
  CONFIRM_BOOKED_LESSON_ERROR,
  CANCEL_BOOKED_LESSON_ERROR_TEACHER,
  CANCEL_BOOKED_LESSON_SUCCESS_TEACHER,
} from './types'
import { toast } from 'react-toastify'

// Set available time for teaching
export const setAvailableTime = (availableTimeArray) => async (dispatch) => {
  try {
    const res = await api.post('/teaching-schedule-for-teacher', {
      availableTime: availableTimeArray,
    })

    toast.success('Update available time for teaching successfully!')

    dispatch({
      type: SET_AVAILABLE_TIME_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_AVAILABLE_TIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get current teacher's available time
export const getCurrentAvailableTime = () => async (dispatch) => {
  try {
    const res = await api.get('/teaching-schedule-for-teacher/me')

    dispatch({
      type: GET_CURRENT_AVAILABLE_TIME,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_CURRENT_AVAILABLE_TIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get available time of a teacher to show to student
export const getAvailableTimeOfATeacher =
  (teacherCalendarId) => async (dispatch) => {
    try {
      const res = await api.get(
        `/teaching-schedule-for-teacher/${teacherCalendarId}`
      )

      dispatch({
        type: GET_AVAILABLE_TIME_OF_TEACHER_SUCCESS,
        payload: res.data,
      })
    } catch (err) {
      dispatch({
        type: GET_CURRENT_AVAILABLE_TIME_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

// Confirm a booked lesson
export const confirmBookedLesson = (bookedLessonId) => async (dispatch) => {
  try {
    const res = await api.put(
      `/teaching-schedule-for-teacher/${bookedLessonId}`
    )

    toast.success('Order has been confirmed successully!')

    dispatch({
      type: CONFIRM_BOOKED_LESSON_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    toast.error('Confirm error')
    dispatch({
      type: CONFIRM_BOOKED_LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Cancel a booked lesson
export const cancelBookedLesson = (bookedLessonId) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/teaching-schedule-for-teacher/${bookedLessonId}`
    )

    dispatch({
      type: CANCEL_BOOKED_LESSON_SUCCESS_TEACHER,
      payload: {
        bookedLessonId,
        newTeacherAvailableTime: res.data.newTeacherAvailableTime,
      },
    })

    toast.info(res.data.msg)
  } catch (err) {
    dispatch({
      type: CANCEL_BOOKED_LESSON_ERROR_TEACHER,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
