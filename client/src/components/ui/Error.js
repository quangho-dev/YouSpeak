import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'

const Error = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <ErrorIcon />
      </Grid>
      <Grid item>
        <Typography variant="body1">&nbsp;Xin lỗi, đã xảy ra lỗi.</Typography>
      </Grid>
    </Grid>
  )
}

export default Error
