import React from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { Grid, Typography, LinearProgress } from '@material-ui/core'
import Moment from 'react-moment'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
}))

const VideoDropzone = ({
  setUploadVideoPercentage,
  uploadVideoPercentage,
  setVideoDuration,
  setThumbnail,
  thumbnail,
  videoDuration,
  setVideoFilePath,
}) => {
  const classes = useStyles()

  const onDrop = (files) => {
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)

        if (percent < 100) {
          setUploadVideoPercentage(percent)
        }
      },
    }
    formData.append('video', files[0])

    axios.post('/api/uploadVideo', formData, config).then((response) => {
      if (response.data.success) {
        let variable = {
          url: response.data.url,
          fileName: response.data.fileName,
        }

        setUploadVideoPercentage(100)
        setTimeout(() => {
          setUploadVideoPercentage(0)
        }, 1000)

        setVideoFilePath(response.data.url)

        //gerenate thumbnail with this filepath !

        axios.post('/api/uploadVideo/thumbnail', variable).then((response) => {
          if (response.data.success) {
            setVideoDuration(response.data.fileDuration)
            setThumbnail(response.data.url)
          } else {
            alert('Failed to make the thumbnails')
          }
        })
      } else {
        alert('failed to save the video in server')
      }
    })
  }
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.formControl}
    >
      <Grid item>
        <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                width: '300px',
                height: '240px',
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <AddIcon style={{ fontSize: '3rem' }} />
            </div>
          )}
        </Dropzone>
      </Grid>
      <Grid item>
        {thumbnail !== '' && (
          <div>
            <img
              src={`http://localhost:5000/${thumbnail}`}
              alt="video-thumbnail"
            />
          </div>
        )}
      </Grid>
      <Grid item>
        {thumbnail !== '' && (
          <Typography variant="body1">
            Độ dài: <Moment format="hh:mm:ss">{videoDuration}</Moment>
          </Typography>
        )}
      </Grid>
      <Grid item className={classes.formControl}>
        <div style={{ width: '100%' }}>
          {uploadVideoPercentage > 0 && (
            <LinearProgress
              variant="determinate"
              value={uploadVideoPercentage}
            />
          )}
        </div>
      </Grid>
    </Grid>
  )
}

export default VideoDropzone
