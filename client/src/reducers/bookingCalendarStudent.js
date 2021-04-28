import {
  BOOK_TIME_ERROR,
  GET_ALL_BOOKED_LESSONS_SUCCESS,
  GET_ALL_BOOKED_LESSONS_ERROR,
  GET_BOOKED_LESSON_SUCCESS,
  GET_BOOKED_LESSON_ERROR,
  CONFIRM_BOOKED_LESSON_SUCCESS,
  CONFIRM_BOOKED_LESSON_ERROR,
  CANCEL_BOOKED_LESSON_SUCCESS,
  CANCEL_BOOKED_LESSON_ERROR,
} from '../actions/types'

const initialState = {
  bookedLessons: [],
  bookedTime: [],
  loading: true,
  error: null,
  bookedLesson: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case BOOK_TIME_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case GET_ALL_BOOKED_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedLessons: payload,
      }
    case GET_ALL_BOOKED_LESSONS_ERROR:
      return {
        ...state,
        loading: false,
        bookedLessons: [],
        error: payload,
      }
    case GET_BOOKED_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedLesson: payload,
      }
    case CONFIRM_BOOKED_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedLesson: payload,
        bookedLessons: state.bookedLessons.map((lesson) =>
          lesson._id === payload._id ? { ...lesson, isConfirmed: true } : lesson
        ),
      }
    case CANCEL_BOOKED_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedLessons: state.bookedLessons.filter(
          (bookedLesson) => bookedLesson._id !== payload.bookedLessonId
        ),
      }
    case GET_BOOKED_LESSON_ERROR:
    case CONFIRM_BOOKED_LESSON_ERROR:
    case CANCEL_BOOKED_LESSON_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        bookedLesson: {},
      }

    default:
      return state
  }
}
