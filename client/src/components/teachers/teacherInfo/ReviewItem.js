import React, { useState } from 'react'
import Rating from '../../ui/Rating'
import { Grid, Typography, Avatar, IconButton } from '@material-ui/core'
import format from 'date-fns/format'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import { useConfirm } from 'material-ui-confirm'
import EditReview from './EditReview'

const ReviewItem = ({ review, updateReviewById, deleteReview, user }) => {
  const [openDialog, setOpenDialog] = useState(false)

  const confirm = useConfirm()

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleDelete = () => {
    confirm({
      description: 'Nhấn đồng ý sẽ xóa nhận xét',
      title: 'Bạn có chắc không?',
    })
      .then(() => {
        deleteReview(review._id)
      })
      .catch(() => {})
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

        {user._id === review.student ? (
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
        ) : (
          <span>{''}</span>
        )}

        <EditReview
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleCloseDialog={handleCloseDialog}
          review={review}
          updateReviewById={updateReviewById}
        />
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
                <Typography variant="body2">Đã sửa lại lần cuối lúc</Typography>
              )}
            </Grid>

            <Grid item>
              {format(new Date(review.date), 'hh:mm aa, dd-MM-yyyy')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReviewItem
