import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import { makeStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import FolderIcon from '@material-ui/icons/Folder'
import { useDispatch, useSelector } from 'react-redux'
import { createOrUpdateALesson, getLessonById } from '../../../actions/lessons'
import axios from 'axios'
import Spinner from '../../ui/Spinner'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  paddingContainer: {
    padding: '0 2em',
  },
}))

const ReuploadLessonDocuments = (props) => {
  const [documentName, setDocumentName] = useState('')

  const [documentsArray, setDocumentsArray] = useState([])
  const [lessonInfo, setLessonInfo] = useState({})

  const lessonId = props.match.params.id

  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)
  const { lesson: singleLesson, loading } = lesson

  const classes = useStyles()

  const handleDocumentNameChange = (e) => {
    setDocumentName(e.target.value)
  }

  const clickAddHandler = () => {}

  const deleteDoc = (indexDoc) => {
    const filterdDocuments = documentsArray.filter(
      (item, index) => index !== indexDoc
    )
    setDocumentsArray(filterdDocuments)
  }

  useEffect(() => {
    if (!singleLesson || singleLesson._id !== lessonId) {
      dispatch(getLessonById(lessonId))
    } else if (!loading || singleLesson) {
      setLessonInfo(singleLesson)
    }
  }, [dispatch, lessonId, singleLesson, loading])

  const handleConfirmChange = () => {
    const { lessonName, content, periods } = lessonInfo

    const docFilesArray = documentsArray.map((doc) => doc.fileDocument)
    const formData = new FormData()

    for (let i = 0; i < docFilesArray.length; i++) {
      formData.append('lessonDocuments', docFilesArray[i])
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      axios
        .post('/api/upload-lesson-documents', formData, config)
        .then(function (res) {
          const newData = documentsArray.map((doc, index) => {
            return {
              documentName: doc.documentName,
              fileDocument: res.data[index],
            }
          })

          const dataToSend = {
            lessonName,
            content,
            documents: newData,
            periods,
          }

          dispatch(createOrUpdateALesson(lessonId, dataToSend))

          props.history.push(`/teachers/lessons/edit/${lessonId}`)
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={3}
      className={classes.paddingContainer}
      style={{ margin: '1em 0' }}
    >
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <Typography
            variant="h4"
            style={{ textTransform: 'uppercase', fontWeight: '600' }}
          >
            Edit documents for type of lesson
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h4"
            style={{ textTransform: 'uppercase', fontWeight: '600' }}
          >{`"${singleLesson.lessonName}"`}</Typography>
        </Grid>
      </Grid>

      <Grid item container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            label="Document's name"
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
            <AddIcon />
            &nbsp;Add document
            <input
              type="file"
              style={{ display: 'none' }}
              onClick={clickAddHandler}
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
          <Typography variant="h6">List of documents:</Typography>
        </Grid>

        <Grid item style={{ alignSelf: 'flex-start' }}>
          <List>
            {documentsArray &&
              documentsArray.map((document, indexDoc) => (
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
      <Grid item container justify="center" spacing={1}>
        <Grid item>
          <MyButton component={Link} to={`/teachers/lessons/edit/${lessonId}`}>
            Back
          </MyButton>
        </Grid>
        <Grid item>
          <MyButton onClick={handleConfirmChange}>Confirm changes</MyButton>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReuploadLessonDocuments
