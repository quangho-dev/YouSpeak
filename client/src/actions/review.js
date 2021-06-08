import api from '../utils/api'
import { toast } from 'react-toastify'
import { GET_REVIEWS, REVIEW_ERROR, ADD_REVIEW, UPDATE_REVIEW } from './types'

// Get all reviews of a teacher
export const getReviewsByTeacherId = (teacherId) => async (dispatch) => {
  try {
    const res = await api.get(`/reviews/${teacherId}`)

    dispatch({
      type: GET_REVIEWS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add a new review
export const addReview = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/reviews', formData)

    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    })

    toast.success('Bạn đã để lại một nhận xét về giáo viên!')
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Update review by id
export const updateReviewById = (reviewId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/reviews/${reviewId}`, formData)

    dispatch({
      type: UPDATE_REVIEW,
      payload: res.data,
    })

    toast.success('Bạn đã sửa nhận xét về giáo viên')
  } catch (err) {
    dispatch({
      type: REVIEW_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
