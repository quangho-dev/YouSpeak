import api from '../utils/api'

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILE_STUDENT_BY_ID_SUCCESS,
  GET_PROFILE_STUDENT_BY_ID_ERROR,
} from './types'
import { toast } from 'react-toastify'

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create or update profile
export const createOrUpdateProfile = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const res = await api.post('/profile', formData)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })

    edit
      ? toast.success('Thông tin đã được cập nhật')
      : toast.success('Thông tin đã được tạo')

    if (!edit) {
      history.push('/dashboard')
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile')

      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })

      toast.success('Your account has been permanently deleted')
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}

// Get student's profile by id
export const getProfileStudentById = (studentId) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/${studentId}`)

    dispatch({ type: GET_PROFILE_STUDENT_BY_ID_SUCCESS, payload: res.data })
  } catch (err) {
    dispatch({
      type: GET_PROFILE_STUDENT_BY_ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
