import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  readMoreText: {
    color: '#015692',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const ReadMoreText = ({ children, maxCharacterCount = 100 }) => {
  const [isTruncated, setIsTruncated] = useState(true)

  const classes = useStyles()

  const text = children

  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text

  const toggleIsTruncated = () => {
    setIsTruncated(!isTruncated)
  }

  return (
    <Typography variant="body1">
      {resultString}
      <span onClick={toggleIsTruncated} className={classes.readMoreText}>
        {isTruncated ? <strong>...Xem thêm</strong> : <strong>Thu lại</strong>}
      </span>
    </Typography>
  )
}

export default ReadMoreText
