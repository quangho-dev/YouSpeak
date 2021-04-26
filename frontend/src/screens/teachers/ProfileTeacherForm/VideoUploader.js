import React, { useState, useEffect } from 'react'
import { Grid, LinearProgress, Typography } from '@material-ui/core'
import ReactPlayer from 'react-player'
import Dropzone from 'react-dropzone'
import { makeStyles } from '@material-ui/styles'
import { useFormikContext } from 'formik'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import MyButton from '../../../components/ui/MyButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  card: {
    // Provide some spacing between cards
    margin: 16,

    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    display: 'flex',
    flexDirection: 'column',

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    justifyContent: 'space-between',
  },
  paddingContainer: {
    padding: '0 4em',
  },
  linkText: {
    textTransform: 'uppercase',
    '&:hover, &:visited, &:active': {
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
  formControl: {
    marginBottom: '1em',
  },
  rowContainer: {
    padding: '0 4em',
  },
  degreeImageCard: {
    maxWidth: 300,
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  expImageCard: {
    maxWidth: 300,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const VideoUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dataToPreview, setDataToPreview] = useState(null)
  const [loadedVideoProgress, setLoadedVideoProgress] = useState(0)

  const { setFieldValue, values } = useFormikContext()

  const classes = useStyles()

  const onDrop = (files) => {
    setLoadedVideoProgress(0)
    if (files.length > 0) {
      const blobData = URL.createObjectURL(files[0])
      setDataToPreview(blobData)
      setSelectedFile(files[0])
    }
  }

  const handleVideoSubmit = () => {
    let formData = new FormData()
    try {
      const config = {
        header: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (ProgressEvent) => {
          setLoadedVideoProgress(
            (ProgressEvent.loaded / ProgressEvent.total) * 100
          )
        },
      }
      formData.append('video', selectedFile)

      axios
        .post('/api/uploadVideo', formData, config)
        .then((response) => {
          if (response.data.success) {
            let variable = {
              url: response.data.url,
              fileName: response.data.fileName,
            }

            setFieldValue('video', response.data.url)

            //gerenate thumbnail with this filepath !

            axios
              .post('/api/uploadVideo/thumbnail', variable, {
                onUploadProgress: (ProgressEvent) => {
                  setLoadedVideoProgress(
                    (ProgressEvent.loaded / ProgressEvent.total) * 100
                  )
                },
              })
              .then((response) => {
                if (response.data.success) {
                  setFieldValue('thumbnail', response.data.url)
                } else {
                  alert('Failed to make the thumbnails')
                }
                toast.success('upload success')
                setDataToPreview(null)
              })
          } else {
            alert('failed to save the video in server')
          }
        })
        .catch((err) => {
          toast.error('upload fail')
        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    URL.revokeObjectURL(selectedFile)
  }, [selectedFile])

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginBottom: '3em' }}
    >
      <Grid item style={{ margin: 'auto' }} className={classes.formControl}>
        <p>
          Upload introduction video ( * )
          <br />
          about 1 - 3 minutes of length
        </p>
      </Grid>

      <Grid
        item
        container
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.formControl}
      >
        <Grid item>
          {dataToPreview !== null ? (
            <ReactPlayer url={dataToPreview} controls playing />
          ) : values.video ? (
            <ReactPlayer url={`/${values.video}`} controls />
          ) : null}
        </Grid>
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
      </Grid>

      {loadedVideoProgress > 0 && (
        <Grid
          item
          container
          spacing={1}
          justify="center"
          alignItems="center"
          style={{ margin: 'auto' }}
        >
          <Grid item style={{ width: '90%' }}>
            <LinearProgress variant="determinate" value={loadedVideoProgress} />
          </Grid>
          <Grid item>
            <Typography variant="body1">{`${Math.round(
              loadedVideoProgress
            )}%`}</Typography>
          </Grid>
        </Grid>
      )}

      <Grid item>
        <MyButton onClick={handleVideoSubmit}>
          <CloudUploadIcon />
          &nbsp;Upload video
        </MyButton>
      </Grid>
    </Grid>
  )
}

export default VideoUploader
