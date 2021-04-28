import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@material-ui/core'

const Auth0LoginButton = ({ label, variant, style, color }) => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      onClick={() => loginWithRedirect()}
      variant={variant}
      style={style}
      color={color}
    >
      {label}
    </Button>
  )
}

export default Auth0LoginButton
