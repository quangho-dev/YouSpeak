import api from '../utils/api'
import { FETCH_TEACHERS_SUCCESS, FETCH_TEACHERS_FAIL } from './types'

// fetch all teachers
export const getTeachers = () => async (dispatch) => {
  try {
    const res = await api.get('/teachers/english')

    dispatch({
      type: FETCH_TEACHERS_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: FETCH_TEACHERS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
