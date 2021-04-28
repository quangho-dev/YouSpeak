import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import {
  Typography,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const AddDocuments = () => {
  const [documentName, setDocumentName] = useState('')

  const { setFieldValue, values } = useFormikContext()

  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value)
  }

  const clickAddHandler = () => {
    const currentDocuments = values.documents
    setFieldValue('documents', currentDocuments.concat(documentName))
    setDocumentName('')
  }

  const clickDeleteHandler = (indexDoc) => {
    const filteredDocuments = values.documents.filter(
      (document, index) => index !== indexDoc
    )
    setFieldValue('documents', filteredDocuments)
  }

  return (
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      style={{ marginBottom: '2em' }}
    >
      <Grid item>
        <Typography
          variant="h6"
          style={{ fontSize: '18px', fontWeight: '500' }}
        >
          Lesson's documents:
        </Typography>
      </Grid>
      <Grid item container justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <TextField
            lable="Document's name"
            value={documentName}
            onChange={handleDocumentNameChange}
          />
        </Grid>

        <Grid item>
          <MyButton onClick={clickAddHandler}>
            <AddIcon />
            &nbsp;Add Document
          </MyButton>
        </Grid>
      </Grid>

      <Grid item container direction="column" alignItems="center">
        <List>
          {values.documents.map((document, indexDoc) => (
            <ListItem key={indexDoc}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={document} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => clickDeleteHandler(indexDoc)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default AddDocuments
