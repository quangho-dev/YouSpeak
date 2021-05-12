import React, { Fragment, useEffect } from 'react'
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import { getCurrentProfileTeacher } from '../../actions/profileTeacher'
import { getCurrentProfile } from '../../actions/profileStudent'
import NotLoggedInNav from './NotLoggedInNav'
import StudentLoggedInNav from './StudentLoggedInNav'
import TeacherLoggedInNav from './TeacherLoggedInNav'

const Header = ({
  logout,
  getCurrentProfile,
  getCurrentProfileTeacher,
  auth: { user, isAuthenticated },
  profileStudent: { profile },
  profileTeacher: { profileTeacher },
}) => {
  useEffect(() => {
    if (user && user.role === 'user') {
      getCurrentProfile()
    } else if (user && user.role === 'teacher') {
      getCurrentProfileTeacher()
    }
  }, [user, getCurrentProfile, getCurrentProfileTeacher])

  return (
    <Fragment>
      {isAuthenticated && user && user.role === 'user' ? (
        <StudentLoggedInNav user={user} profile={profile} logout={logout} />
      ) : isAuthenticated && user && user.role === 'teacher' ? (
        <TeacherLoggedInNav
          user={user}
          profileTeacher={profileTeacher}
          logout={logout}
        />
      ) : (
        <NotLoggedInNav />
      )}
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profileStudent: state.profileStudent,
  profileTeacher: state.profileTeacher,
})

export default connect(mapStateToProps, {
  logout,
  getCurrentProfile,
  getCurrentProfileTeacher,
})(Header)
