import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

const TeacherPrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, loading } = auth
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress style={{ width: '60px' }} />
          </div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/teachers/login" />
        )
      }
    />
  )
}

export default TeacherPrivateRoute
