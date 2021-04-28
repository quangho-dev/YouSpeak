import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import PublishIcon from '@material-ui/icons/Publish'
import { useFormikContext } from 'formik'
import { makeStyles } from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'
import DeleteIcon from '@material-ui/icons/Delete'
import FolderIcon from '@material-ui/icons/Folder'

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '0 2em',
  },
}))

const EditLessonDocuments = ({ onClose, open }) => {
  const [documentName, setDocumentName] = useState('')
  const [fileDocument, setFileDocument] = useState(null)
  const [error, setError] = useState(null)

  const classes = useStyles()

  const { setFieldValue, values } = useFormikContext()

  const handleDocumentNameChange = (e) => {
    setError(null)
    setDocumentName(e.target.value)
  }

  const handleFileChange = (e) => {
    setError(null)
    const file = e.target.files[0]
    setFileDocument(file)
  }

  const handleAddToList = () => {
    if (!documentName) {
      setError('Vui lòng điền tên tài liệu.')
    } else if (fileDocument === null) {
      setError('Vui lòng tải file tài liệu')
    } else {
      const prevDocuments = values.documents
      setFieldValue(
        'documents',
        prevDocuments.concat({ documentName, fileDocument })
      )
      setDocumentName('')
      setFileDocument(null)
      setError(null)
    }
  }

  const deleteDoc = (indexDoc) => {
    const filterdDocuments = values.documents.filter(
      (item, index) => index !== indexDoc
    )
    setFieldValue('documents', filterdDocuments)
  }

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="edit-lesson-documents"
      open={open}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={3}
        className={classes.paddingContainer}
        style={{ margin: '1em 0' }}
      >
        {error && (
          <Grid item style={{ marginTop: '1em' }}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item>
          <Typography variant="h4" style={{ textTransform: 'uppercase' }}>
            Thay thế tài liệu
          </Typography>
        </Grid>
        <Grid item container justify="center" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              label="Tên tài liệu"
              value={documentName}
              onChange={handleDocumentNameChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              color="primary"
              style={{ color: 'white', fontWeight: '500', margin: 'auto' }}
            >
              <PublishIcon />
              &nbsp;Tải tài liệu
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          style={{ width: '500px', marginBottom: '2em' }}
        >
          <Grid item>
            <Typography variant="h6" gutterBottom>
              Tài liệu đang thêm:
            </Typography>
          </Grid>
          <Grid item style={{ alignSelf: 'flex-start' }}>
            <Typography variant="body1">
              <span style={{ fontWeight: '600' }}>Tên tài liệu:</span>&nbsp;
              {documentName}
            </Typography>
          </Grid>
          <Grid item style={{ alignSelf: 'flex-start' }}>
            <Typography variant="body1" gutterBottom>
              <span style={{ fontWeight: '600' }}>File:</span>&nbsp;
              {fileDocument && fileDocument.name}
            </Typography>
          </Grid>
          <Grid item>
            <MyButton onClick={handleAddToList}>Thêm vào danh sách</MyButton>
          </Grid>
        </Grid>

        <Grid
          item
          container
          direction="column"
          alignItems="center"
          style={{ width: '500px', marginBottom: '2em' }}
        >
          <Grid item>
            <Typography variant="h6">Danh sách tài liệu:</Typography>
          </Grid>

          <Grid item style={{ alignSelf: 'flex-start' }}>
            <List>
              {values.documents &&
                values.documents.map((document, indexDoc) => (
                  <ListItem key={indexDoc}>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={document.documentName} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteDoc(indexDoc)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
        <Grid item>
          <MyButton onClick={onClose}>Xong</MyButton>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default EditLessonDocuments
