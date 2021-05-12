import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILE_STUDENT_BY_ID_SUCCESS,
  GET_PROFILE_STUDENT_BY_ID_ERROR,
} from '../actions/types'

const initialState = {
  profile: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case GET_PROFILE_STUDENT_BY_ID_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case PROFILE_ERROR:
    case GET_PROFILE_STUDENT_BY_ID_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      }
    default:
      return state
  }
}
