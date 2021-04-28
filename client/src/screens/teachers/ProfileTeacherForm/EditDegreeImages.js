import React, { useState } from 'react'
import { Grid, Typography, Card, CardActions, Button } from '@material-ui/core'
import MyButton from '../../../components/ui/MyButton'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import CloudDoneIcon from '@material-ui/icons/CloudDone'

const useStyles = makeStyles((theme) => ({
  degreeImage: {
    width: '200px',
    height: 'auto',
  },
}))

const EditDegreeImages = ({ open, onClose }) => {
  const [degreeImagesFiles, setDegreeImagesFiles] = useState([])
  const [previewDegreeImages, setPreviewDegreeImages] = useState([])

  const classes = useStyles()

  const handleDegreeImagesUpload = (event) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files)

      setDegreeImagesFiles((prevState) => prevState.concat(filesArray))

      const blobArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setPreviewDegreeImages((prevState) => prevState.concat(blobArray))

      Array.from(event.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      )
    }
  }

  const renderImages = (source) => {
    return source.map((item, imageIndex) => {
      return (
        <Grid item key={imageIndex}>
          <Card>
            <img alt="degree" className={classes.degreeImage} src={item} />
            <CardActions>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => deleteDegreeImages(imageIndex)}
              >
                <DeleteIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })
  }

  const deleteDegreeImages = (imageIndex) => {
    const filteredPreviewImages = previewDegreeImages.filter(
      (item, index) => index !== imageIndex
    )
    const filteredImagesFiles = degreeImagesFiles.filter(
      (item, index) => index !== imageIndex
    )
    setPreviewDegreeImages(filteredPreviewImages)
    setDegreeImagesFiles(filteredImagesFiles)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="container"
    >
      <Grid item style={{ marginBottom: '2em' }}>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '600' }}
        >
          Edit images of teaching certificates
        </Typography>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ marginBottom: '2em' }}
      >
        <Grid item>
          <MyButton component="label">
            <CloudUploadIcon />
            &nbsp;Upload images
            <input
              id="exp-upload"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={handleDegreeImagesUpload}
            />
          </MyButton>
        </Grid>

        <Grid item>
          <MyButton>
            <CloudDoneIcon />
            &nbsp;Submit
          </MyButton>
        </Grid>
      </Grid>

      <Grid item container justify="center" alignItems="center" spacing={2}>
        {renderImages(previewDegreeImages)}
      </Grid>
    </Grid>
  )
}

export default EditDegreeImages
