import React from 'react'
import { Button } from '@material-ui/core'

const MyButton = ({ children, ...rest }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{ color: 'white' }}
      disableRipple
      {...rest}
    >
      {children}
    </Button>
  )
}

export default MyButton
