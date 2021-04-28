import { Button, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
  },
}))
function ReadMore({ children }) {
  const classes = useStyles()
  const [isHidden, setIsHidden] = useState(true)
  return (
    <>
      <div className={isHidden ? classes.hidden : null}>{children}</div>
      <Button size="small" onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? '⬇ More' : '⬆ Less'}
      </Button>
    </>
  )
}

export default ReadMore
