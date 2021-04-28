import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'

const Auth0SignupButton = ({ label, style, color, variant }) => {
  const { loginWithRedirect } = useAuth0()
  return (
    <Button
      variant={variant}
      color={color}
      style={style}
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
    >
      {label}
    </Button>
  )
}

export default Auth0SignupButton
