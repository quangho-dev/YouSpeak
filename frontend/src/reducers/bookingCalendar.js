import {
  SET_AVAILABLE_TIME_SUCCESS,
  SET_AVAILABLE_TIME_ERROR,
  GET_CURRENT_AVAILABLE_TIME,
  GET_CURRENT_AVAILABLE_TIME_ERROR,
  GET_AVAILABLE_TIME_OF_TEACHER_SUCCESS,
  GET_CURRENT_AVAILABLE_OF_TEACHER_ERROR,
  CANCEL_BOOKED_LESSON_SUCCESS,
  CANCEL_BOOKED_LESSON_ERROR,
  BOOK_TIME_SUCCESS,
} from '../actions/types'

const initialState = {
  availableTime: [],
  loading: true,
  currentTeacher: null,
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_AVAILABLE_TIME_SUCCESS:
    case GET_AVAILABLE_TIME_OF_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTeacher: payload.user,
        availableTime: payload.availableTime,
      }
    case BOOK_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        availableTime: state.availableTime
          .filter((time) => time.id !== payload.id1)
          .filter((time) => time.id !== payload.id2),
      }
    case GET_CURRENT_AVAILABLE_TIME:
      return {
        ...state,
        loading: false,
        currentTeacher: payload.user,
        availableTime: payload.availableTime,
      }
    case SET_AVAILABLE_TIME_ERROR:
    case GET_CURRENT_AVAILABLE_TIME_ERROR:
    case GET_CURRENT_AVAILABLE_OF_TEACHER_ERROR:
      return {
        ...state,
        loading: false,
        currentTeacher: null,
        error: payload,
      }
    case CANCEL_BOOKED_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        availableTime: payload.res.data.addedAvailableTime,
      }
    case CANCEL_BOOKED_LESSON_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
