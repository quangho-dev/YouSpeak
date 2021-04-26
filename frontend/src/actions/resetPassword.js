import api from '../utils/api'
import { toast } from 'react-toastify'

export const sendForgotPassword = (email) => async (dispatch) => {
  try {
    const res = await api.post('/forgot', { email })

    toast.success(res.data.msg)
  } catch (err) {
    const error = err.response.data.error

    toast.error(error)
  }
}

export const resetPassword = ({ password, token }) => async (dispatch) => {
  try {
    const res = await api.post(`/reset/${token}`, { password })

    toast.success(res.data.msg)
  } catch (err) {
    const error = err.response.data.msg

    toast.error(error)
  }
}
