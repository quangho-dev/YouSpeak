import React from 'react'
import {
  FormGroup,
  TextField,
  MenuItem,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import MyButton from '../../ui/MyButton'
import { connect } from 'react-redux'
import { addReview } from '../../../actions/review'
const AddReview = ({
  openAddReviewDialog,
  handleClose,
  addReview,
  teacherId,
}) => {
  const initialValues = {
    rating: '0',
    content: '',
  }

  const handleSubmit = async (values) => {
    const { rating, content } = values

    await addReview({ rating, content, teacher: teacherId })
    await handleClose()
  }

  return (
    <Dialog
      open={openAddReviewDialog}
      onClose={handleClose}
      style={{ minWidth: '100%' }}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Thêm nhận xét</DialogTitle>

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
                    <MyButton onClick={handleClose}>Đóng</MyButton>
                  </Grid>

                  <Grid item>
                    <MyButton type="submit">Gửi</MyButton>
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
  )
}

export default connect(null, { addReview })(AddReview)
