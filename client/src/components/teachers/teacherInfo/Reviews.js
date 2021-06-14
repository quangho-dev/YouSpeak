import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getReviewsByTeacherId,
  updateReviewById,
  deleteReview,
} from '../../../actions/review'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import RateReviewIcon from '@material-ui/icons/RateReview'
import AddReview from './AddReview'
import ReviewItem from './ReviewItem'
import { useTheme } from '@material-ui/styles'

const Reviews = ({
  teacherId,
  getReviewsByTeacherId,
  updateReviewById,
  auth: { user },
  review: { reviews, loading, error },
  deleteReview,
}) => {
  const [openAddReviewDialog, setOpenAddReviewDialog] = useState(false)

  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  const handleOpenDialog = () => {
    setOpenAddReviewDialog(true)
  }

  const handleClose = () => {
    setOpenAddReviewDialog(false)
  }

  useEffect(() => {
    getReviewsByTeacherId(teacherId)
  }, [getReviewsByTeacherId, teacherId])

  return (
    <Card>
      <CardContent>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography style={{ textAlign: 'center' }} variant="h6">
              Những nhận xét về giáo viên:
            </Typography>
          </Grid>

          <Grid
            item
            container
            justify={matchesLG ? 'space-around' : 'center'}
            alignItems="center"
            spacing={2}
          >
            {reviews.length === 0 ? (
              <Typography variant="body1">
                Chưa có nhận xét nào về giáo viên.
              </Typography>
            ) : (
              reviews.map((review) => (
                <Grid
                  item
                  key={review._id}
                  style={{
                    border: '2px solid #3b3b3b',
                    borderRadius: '4px',
                    margin: '5px',
                    width: matchesSM ? '80%' : matchesMD ? '60%' : '100%',
                  }}
                  lg={5}
                >
                  <ReviewItem
                    review={review}
                    updateReviewById={updateReviewById}
                    deleteReview={deleteReview}
                    user={user}
                  />
                </Grid>
              ))
            )}
          </Grid>

          <Grid item>
            <MyButton onClick={handleOpenDialog}>
              <RateReviewIcon />
              &nbsp;Thêm nhận xét
            </MyButton>

            <AddReview
              openAddReviewDialog={openAddReviewDialog}
              handleClose={handleClose}
              teacherId={teacherId}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  review: state.review,
})

export default connect(mapStateToProps, {
  getReviewsByTeacherId,
  updateReviewById,
  deleteReview,
})(Reviews)
