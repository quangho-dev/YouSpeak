import React from 'react'
import AuthenticationButton from './authentication-button'
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuIcon,
  Typography,
} from '@material-ui/core'

const AuthNav = () => (
  <AppBar style={{ marginTop: '5em' }}>
    <Toolbar>
      <AuthenticationButton />
    </Toolbar>
  </AppBar>
)

export default AuthNav
