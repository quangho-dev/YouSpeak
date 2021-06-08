import React, { useState } from 'react'
import Rating from '../../ui/Rating'
import {
  Grid,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  FormGroup,
} from '@material-ui/core'
import format from 'date-fns/format'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import MyButton from '../../ui/MyButton'

const ReviewItem = ({ review, updateReviewById }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleDelete = () => {}

  const initialValues = {
    content: review.content,
    rating: review.rating,
  }

  const handleSubmit = async (values) => {
    updateReviewById(review._id, values)
    setOpenDialog(false)
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        style={{ width: '100%' }}
      >
        {review.rating !== '0' ? (
          <Grid item>
            <Rating rating={Number(review.rating)} />
          </Grid>
        ) : (
          <span>{''}</span>
        )}

        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Grid container>
            <Grid item>
              <IconButton onClick={handleOpenDialog}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={handleDelete}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle style={{ textAlign: 'center' }}>
            Sửa nhận xét
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              style={{ minWidth: '100%' }}
            >
              {({ values, errors }) => (
                <Form>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item style={{ minWidth: '90%' }}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="rating"
                          label="Đánh giá giáo viên"
                          as={TextField}
                          select
                        >
                          <MenuItem value="0">Chọn đánh giá</MenuItem>
                          <MenuItem value="1">{'1 / 5'}</MenuItem>
                          <MenuItem value="2">{'2 / 5'}</MenuItem>
                          <MenuItem value="3">{'3 / 5'}</MenuItem>
                          <MenuItem value="4">{'4 / 5'}</MenuItem>
                          <MenuItem value="5">{'5 / 5'}</MenuItem>
                        </Field>
                      </FormGroup>
                    </Grid>

                    <Grid item style={{ minWidth: '90%' }}>
                      <FormGroup>
                        <Field
                          autoComplete="off"
                          name="content"
                          as={TextField}
                          label="Nội dung"
                          multiline
                          rows={5}
                        />
                        <ErrorMessage name="content" />
                      </FormGroup>
                    </Grid>

                    <Grid
                      item
                      container
                      justify="center"
                      align="center"
                      spacing={1}
                    >
                      <Grid item>
                        <MyButton onClick={handleCloseDialog}>Đóng</MyButton>
                      </Grid>

                      <Grid item>
                        <MyButton type="submit">Cập nhật</MyButton>
                      </Grid>
                    </Grid>
                    <Grid item>
                      {JSON.stringify(values, null, 2)}
                      {JSON.stringify(errors, null, 2)}
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </Grid>

      <Grid item>
        <Typography variant="body1">{review.content}</Typography>
      </Grid>

      <Grid item container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar src={review.studentAvatar} />
            </Grid>
            <Grid item>&nbsp;{review.studentName}</Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container>
            <Grid item style={{ marginRight: '0.5em' }}>
              {review.isUpdated && (
                <Typography variant="body2">Cập nhật lần cuối lúc</Typography>
              )}
            </Grid>

            <Grid item>
              {format(new Date(review.date), 'hh:mm, dd-MM-yyyy')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReviewItem
