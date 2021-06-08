import { combineReducers } from 'redux'
import auth from './auth'
import profileStudent from './profileStudent'
import alert from './alert'
import profileTeacher from './profileTeacher'
import teachersList from './teachersList'
import typeOfLesson from './typeOfLesson'
import teachingScheduleForTeacher from './teachingScheduleForTeacher'
import learningScheduleForStudent from './learningScheduleForStudent'
import review from './review'

export default combineReducers({
  auth,
  profileStudent,
  alert,
  profileTeacher,
  teachersList,
  typeOfLesson,
  teachingScheduleForTeacher,
  learningScheduleForStudent,
  review,
})
