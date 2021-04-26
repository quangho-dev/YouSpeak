import api from '../utils/api'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types'
import { loadUser } from './auth'
import { toast } from 'react-toastify'

// Register Teacher
export const registerTeacher = (formData) => async (dispatch) => {
  const { name, email, password } = formData

  try {
    const res = await api.post('/teachers/register-teacher', {
      name,
      email,
      password,
    })

    if (res) {
      toast.success(res.data.msg)
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => toast.error(error.msg))
    }

    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

// Login Teacher
export const loginTeacher = (email, password) => async (dispatch) => {
  const body = { email, password }

  try {
    const res = await api.post('/teachers/login-teacher', body)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => toast.error(error.msg))
    }

    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

// Logout
export const logoutTeacher = () => ({ type: LOGOUT })

// resend confirmation token
export const resendConfirmationToken = (email) => async (dispatch) => {
  try {
    const res = await api.post('/teachers/resend-confirmation-token', { email })

    toast.success(res.data.msg)
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => toast.error(error.msg))
    }
  }
}
