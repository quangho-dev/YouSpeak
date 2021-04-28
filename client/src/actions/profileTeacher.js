import api from '../utils/api'
import { toast } from 'react-toastify'
import {
  GET_PROFILE_TEACHER,
  PROFILE_TEACHER_ERROR,
  CLEAR_PROFILE_TEACHER,
  GET_PROFILE_TEACHER_BY_ID_SUCCESS,
  GET_PROFILE_TEACHER_BY_ID_ERROR,
  ACCOUNT_DELETED,
} from './types'

// Get current teachers profile
export const getCurrentProfileTeacher = () => async (dispatch) => {
  try {
    const res = await api.get('/profileTeacher/me')

    dispatch({
      type: GET_PROFILE_TEACHER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create or update profile
export const createOrUpdateProfileTeacher = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const res = await api.post('/profileTeacher', formData)

    dispatch({
      type: GET_PROFILE_TEACHER,
      payload: res.data,
    })

    toast.success(
      edit
        ? 'Your profile has been updated successfully!'
        : 'Your profile has been created!'
    )

    if (!edit) {
      history.push('/teachers/dashboard')
    }
  } catch (err) {
    dispatch({
      type: PROFILE_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile')

      dispatch({ type: CLEAR_PROFILE_TEACHER })
      dispatch({ type: ACCOUNT_DELETED })

      toast.success('Your account has been permanently deleted')
    } catch (err) {
      dispatch({
        type: PROFILE_TEACHER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

// Get profile teacher by Id
export const getProfileTeacherById = (teacherId) => async (dispatch) => {
  try {
    const res = await api.get(`/profileTeacher/${teacherId}`)

    dispatch({ type: GET_PROFILE_TEACHER_BY_ID_SUCCESS, payload: res.data })
  } catch (err) {
    dispatch({
      type: GET_PROFILE_TEACHER_BY_ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
