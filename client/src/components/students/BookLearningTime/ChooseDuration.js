import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import formatMoney from '../../../utils/formatMoney'
import { makeStyles } from '@material-ui/styles'
import { useFormikContext } from 'formik'
import { getLessonById } from '../../../actions/lessons'
import { connect } from 'react-redux'
import { milliseconds } from 'date-fns'
import Spinner from '../../ui/Spinner'

const useStyles = makeStyles((theme) => ({
  pricingButton: {
    width: '10em',
    borderRadius: '50%',
    height: '5em',
  },
}))

const ChooseDuration = ({
  getLessonById,
  lessons: { lesson, loading },
  nextPage,
}) => {
  const { setFieldValue, values } = useFormikContext()

  const handleClickThirtyMinutes = (price) => {
    setFieldValue('duration', milliseconds({ minutes: 30 }))
    setFieldValue('price', price)
    nextPage()
  }

  const handleClickFortyFiveMinutes = (price) => {
    setFieldValue('duration', milliseconds({ minutes: 45 }))
    setFieldValue('price', price)
    nextPage()
  }

  const handleClickOneHour = (price) => {
    setFieldValue('duration', milliseconds({ minutes: 60 }))
    setFieldValue('price', price)
    nextPage()
  }

  const classes = useStyles()

  useEffect(() => {
    getLessonById(values.lesson)
  }, [getLessonById, values.lesson])

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', margin: '1.5em 0' }}
        >
          Chọn thời lượng của bài học
        </Typography>
      </Grid>
      <Grid
        item
        container
        alignItems="center"
        justify="space-between"
        style={{ maxWidth: '35em', marginBottom: '1.5em' }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                {lesson &&
                  lesson.periods[0] &&
                  lesson.periods[0].thirtyMinutes.price !== 0 && (
                    <>
                      <Grid item>
                        <Typography variant="h6">30 phút</Typography>
                      </Grid>
                      <Grid item style={{ marginBottom: '1.5em' }}>
                        <ExpandMoreIcon fontSize="large" />
                      </Grid>
                      <Grid item>
                        <MyButton
                          className={classes.pricingButton}
                          onClick={() =>
                            handleClickThirtyMinutes(
                              lesson.periods[0].thirtyMinutes.price
                            )
                          }
                        >
                          {formatMoney(lesson.periods[0].thirtyMinutes.price)}
                          &nbsp;VNĐ
                        </MyButton>
                      </Grid>
                    </>
                  )}
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                {lesson &&
                  lesson.periods[0] &&
                  lesson.periods[0].fortyFiveMinutes.price !== 0 && (
                    <>
                      <Grid item>
                        <Typography variant="h6">45 phút</Typography>
                      </Grid>
                      <Grid item style={{ marginBottom: '1.5em' }}>
                        <ExpandMoreIcon fontSize="large" />
                      </Grid>
                      <Grid item>
                        <MyButton
                          className={classes.pricingButton}
                          onClick={() =>
                            handleClickFortyFiveMinutes(
                              lesson.periods[0].fortyFiveMinutes.price
                            )
                          }
                        >
                          {formatMoney(
                            lesson.periods[0].fortyFiveMinutes.price
                          )}
                          &nbsp;VNĐ
                        </MyButton>
                      </Grid>
                    </>
                  )}
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column" alignItems="center">
                {lesson &&
                  lesson.periods[0] &&
                  lesson.periods[0].oneHour.price !== 0 && (
                    <>
                      <Grid item>
                        <Typography variant="h6">60 phút</Typography>
                      </Grid>
                      <Grid item style={{ marginBottom: '1.5em' }}>
                        <ExpandMoreIcon fontSize="large" />
                      </Grid>
                      <Grid item>
                        <MyButton
                          className={classes.pricingButton}
                          onClick={() =>
                            handleClickOneHour(lesson.periods[0].oneHour.price)
                          }
                        >
                          {formatMoney(lesson.periods[0].oneHour.price)}
                          &nbsp;VNĐ
                        </MyButton>
                      </Grid>
                    </>
                  )}
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  lessons: state.lesson,
})

export default connect(mapStateToProps, { getLessonById })(ChooseDuration)
