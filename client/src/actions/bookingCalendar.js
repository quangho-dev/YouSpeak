import api from '../utils/api'
import {
  SET_AVAILABLE_TIME_SUCCESS,
  SET_AVAILABLE_TIME_ERROR,
  GET_CURRENT_AVAILABLE_TIME,
  GET_CURRENT_AVAILABLE_TIME_ERROR,
  GET_AVAILABLE_TIME_OF_TEACHER_SUCCESS,
  CONFIRM_BOOKED_LESSON_SUCCESS,
  CONFIRM_BOOKED_LESSON_ERROR,
} from './types'
import { toast } from 'react-toastify'

// Set available time for teaching
export const setAvailableTime = (availableTimeArray) => async (dispatch) => {
  try {
    const res = await api.post('/booking-calendar-teacher', {
      availableTime: availableTimeArray,
    })

    toast.success('Đã đặt thời gian có thể dạy.')

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

// Get current teachers available time
export const getCurrentAvailableTime = () => async (dispatch) => {
  try {
    const res = await api.get('/booking-calendar-teacher/me')

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
export const getAvailableTimeOfATeacher = (teacherCalendarId) => async (
  dispatch
) => {
  try {
    const res = await api.get(`/booking-calendar-teacher/${teacherCalendarId}`)

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
    const res = await api.put(`/booking-calendar-teacher/${bookedLessonId}`)

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
