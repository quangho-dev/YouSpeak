import React from 'react'
import { Button } from '@material-ui/core'
import { useFormikContext } from 'formik'

const ButtonFileInput = ({ label, setPreviewAvatar }) => {
  const { setFieldValue } = useFormikContext()

  const onChangeHandler = (e) => {
    if (e.target.files[0]) {
      const file = e.currentTarget.files[0]
      const blobAvatar = URL.createObjectURL(file)
      setPreviewAvatar(blobAvatar)

      setFieldValue('selectedTeacherAvatarFile', file)
    }
  }
  return (
    <>
      <Button
        variant="contained"
        component="label"
        color="primary"
        style={{ color: 'white', fontWeight: '500', margin: 'auto' }}
      >
        {label}
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={onChangeHandler}
        />
      </Button>
    </>
  )
}

export default ButtonFileInput
