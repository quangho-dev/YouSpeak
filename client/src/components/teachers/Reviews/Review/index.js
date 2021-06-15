import React from 'react'
import { Grid, Typography, Avatar } from '@material-ui/core'
import { format } from 'date-fns'
import Rating from '../../../ui/Rating'

const Review = ({ review }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {review.rating !== '0' ? (
        <Grid item style={{ alignSelf: 'flex-start' }}>
          <Rating rating={Number(review.rating)} />
        </Grid>
      ) : (
        <span>{''}</span>
      )}

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

export default Review
