import React from 'react'
import { CircularProgress, Grid } from '@material-ui/core'

const Spinner = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Grid item>
        <CircularProgress style={{ fontSize: '5em' }} />
      </Grid>
    </Grid>
  )
}

export default Spinner
