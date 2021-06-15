import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getReviewsByTeacherId } from '../../../../actions/review'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import Review from '../Review'

const Reviews = ({
  auth: { user },
  review: { reviews, loading, error },
  getReviewsByTeacherId,
}) => {
  useEffect(() => {
    getReviewsByTeacherId(user._id)
  }, [getReviewsByTeacherId, user._id])

  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

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
                  <Review review={review} />
                </Grid>
              ))
            )}
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

export default connect(mapStateToProps, { getReviewsByTeacherId })(Reviews)
