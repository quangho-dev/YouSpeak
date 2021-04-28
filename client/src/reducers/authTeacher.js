import {
  REGISTER_TEACHER_SUCCESS,
  //REGISTER_FAIL,
  TEACHER_LOADED,
  AUTH_TEACHER_ERROR,
  LOGIN_TEACHER_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT_TEACHER,
  ACCOUNT_TEACHER_DELETED,
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  teacher: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case TEACHER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        teacher: payload,
      }
    case REGISTER_TEACHER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case LOGIN_TEACHER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case ACCOUNT_TEACHER_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        teacher: null,
      }
    case AUTH_TEACHER_ERROR:
    case LOGOUT_TEACHER:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        teacher: null,
      }
    default:
      return state
  }
}
