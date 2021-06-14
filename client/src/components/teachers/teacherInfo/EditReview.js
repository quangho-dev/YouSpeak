import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
  FormGroup,
} from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import MyButton from '../../ui/MyButton'

const EditReview = ({
  openDialog,
  handleCloseDialog,
  review,
  updateReviewById,
  setOpenDialog,
}) => {
  const initialValues = {
    content: review.content,
    rating: review.rating,
  }

  const handleSubmit = (values) => {
    updateReviewById(review._id, values)
    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle style={{ textAlign: 'center' }}>Sửa nhận xét</DialogTitle>
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
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default EditReview
