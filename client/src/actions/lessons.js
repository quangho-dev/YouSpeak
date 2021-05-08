import {
  GET_LESSONS,
  LESSON_ERROR,
  CREATE_LESSON,
  UPDATE_LESSON,
  GET_LESSON,
  REMOVE_LESSON,
  GET_LESSONS_OF_A_TEACHER_SUCCESS,
  GET_LESSONS_OF_A_TEACHER_ERROR,
} from './types'
import api from '../utils/api'
import { toast } from 'react-toastify'

// get all lessons of current teacher
export const getLessons = () => async (dispatch) => {
  try {
    const res = await api.get('/teachers/lessons/me')

    dispatch({
      type: GET_LESSONS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

export const createALesson = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/teachers/lessons', formData)

    dispatch({
      type: CREATE_LESSON,
      payload: res.data,
    })

    toast.success('Bài học đã được tạo')
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const getLessonById = (lessonId) => async (dispatch) => {
  try {
    const res = await api.get(`/teachers/lessons/${lessonId}`)

    dispatch({
      type: GET_LESSON,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const createOrUpdateALesson = (lessonId, formData) => async (
  dispatch
) => {
  try {
    const res = await api.post(
      `/teachers/lessons/create-or-update-a-lesson/${lessonId}`,
      formData
    )

    dispatch({
      type: UPDATE_LESSON,
      payload: res.data,
    })

    toast.success('Cập nhật thông tin bài học thành công!')
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const deleteLesson = (lessonId) => async (dispatch) => {
  try {
    await api.delete(`/teachers/lessons/${lessonId}`)

    dispatch({
      type: REMOVE_LESSON,
      payload: lessonId,
    })
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get all lessons of a teacher by teacher's id
export const getLessonsOfTeacherById = (teacherId) => async (dispatch) => {
  try {
    const res = await api.get(`/teachers/${teacherId}/lessons`)

    dispatch({
      type: GET_LESSONS_OF_A_TEACHER_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_LESSONS_OF_A_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
