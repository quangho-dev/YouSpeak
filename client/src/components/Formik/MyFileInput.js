import React from 'react'
import { useField } from 'formik'
import axios from 'axios'
import Button from '@material-ui/core/Button'

const MyFileInput = ({ setUploading, ...props }) => {
  const [field] = useField(props)

  return (
    <Button
      variant="contained"
      component="label"
      color="primary"
      style={{ color: 'white', fontWeight: '500' }}
    >
      Tải file ảnh
      <input
        type="file"
        style={{ display: 'none' }}
        {...field}
        {...props}
        onChange={}
      />
    </Button>
  )
}

export default MyFileInput
