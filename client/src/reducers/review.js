import {
  GET_REVIEWS,
  ADD_REVIEW,
  REVIEW_ERROR,
  UPDATE_REVIEW,
} from '../actions/types'

const initialState = {
  reviews: [],
  loading: true,
  error: {},
}

function reviewReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: [payload, ...state.reviews],
        loading: false,
      }
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === payload._id ? payload : review
        ),
        loading: false,
      }
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      }
    case REVIEW_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default reviewReducer
