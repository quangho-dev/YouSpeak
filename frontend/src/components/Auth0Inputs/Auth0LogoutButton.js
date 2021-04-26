import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'

const Auth0LogoutButton = ({ label, variant, color, style }) => {
  const { logout } = useAuth0()
  return (
    <Button
      variant={variant}
      color={color}
      style={style}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      {label}
    </Button>
  )
}

export default Auth0LogoutButton
