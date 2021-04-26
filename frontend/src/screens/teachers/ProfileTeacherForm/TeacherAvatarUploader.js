import React, { useState } from 'react'
import {
  Grid,
  LinearProgress,
  Typography,
  Avatar,
  Button,
} from '@material-ui/core'
import { useFormikContext } from 'formik'
import axios from 'axios'
import MyButton from '../../../components/ui/MyButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { toast } from 'react-toastify'

const TeacherAvatarUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dataToPreview, setDataToPreview] = useState(null)
  const [
    loadedTeacherAvatarProgress,
    setLoadedTeacherAvatarProgress,
  ] = useState(0)

  const { setFieldValue, values } = useFormikContext()

  const handleAvatarSubmit = async () => {
    const formData = new FormData()
    formData.append('teacherAvatar', selectedFile)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (ProgressEvent) => {
          setLoadedTeacherAvatarProgress(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          )
        },
      }

      await axios
        .post('/api/upload-teacher-avatar', formData, config)
        .then((res) => {
          toast.success('upload success')
          setFieldValue('teacherAvatar', res.data)
        })
        .catch((err) => {
          toast.error('upload error')
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      const file = e.currentTarget.files[0]
      const blobAvatar = URL.createObjectURL(file)
      setDataToPreview(blobAvatar)

      setSelectedFile(file)

      URL.revokeObjectURL(file)
    }
  }

  return (
    <Grid item container direction="column" alignItems="center">
      <Grid item>
        <Avatar
          src={
            dataToPreview
              ? dataToPreview
              : values.teacherAvatar
              ? values.teacherAvatar
              : ''
          }
          style={{ width: '4em', height: '4em' }}
          alt="teacher-avatar"
        />
      </Grid>

      <Grid item>
        <p>
          Change avatar image ( * )
          <br />
          Maximum size: 2MB
        </p>
      </Grid>

      {loadedTeacherAvatarProgress > 0 && (
        <Grid
          item
          container
          spacing={1}
          justify="center"
          alignItems="center"
          style={{ margin: 'auto' }}
        >
          <Grid item style={{ width: '90%' }}>
            <LinearProgress
              variant="determinate"
              value={loadedTeacherAvatarProgress}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">{`${Math.round(
              loadedTeacherAvatarProgress
            )}%`}</Typography>
          </Grid>
        </Grid>
      )}

      <Grid item container justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            component="label"
            color="primary"
            style={{ color: 'white', fontWeight: '500' }}
          >
            Select your avatar picture
            <input
              type="file"
              style={{ display: 'none' }}
              onChange={handleChangeAvatar}
            />
          </Button>
        </Grid>

        <Grid item>
          <MyButton onClick={handleAvatarSubmit}>
            <CloudUploadIcon />
            &nbsp;Upload
          </MyButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TeacherAvatarUploader
