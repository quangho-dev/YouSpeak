import React from 'react'
import { Box, LinearProgress, Typography } from '@material-ui/core'

const LinearProgressWithLabel = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          {...props}
          style={{ height: '1em' }}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default LinearProgressWithLabel
