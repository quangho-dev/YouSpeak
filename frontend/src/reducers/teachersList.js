import { FETCH_TEACHERS_SUCCESS, FETCH_TEACHERS_FAIL } from '../actions/types'

const initialState = {
  teachersList: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        teachersList: payload,
        loading: false,
      }
    case FETCH_TEACHERS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
