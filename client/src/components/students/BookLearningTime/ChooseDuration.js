import React, { useEffect } from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import formatMoney from '../../../utils/formatMoney'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useFormikContext } from 'formik'
import { getLessonById } from '../../../actions/typeOfLesson'
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
  typeOfLesson: { lesson, loading },
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
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {
    getLessonById(values.lesson)
  }, [getLessonById, values.lesson])

  return (
    <Grid item container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography
          variant={matchesMD ? 'h4' : 'h5'}
          style={{
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          Chọn thời lượng của bài học
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction={matchesSM ? 'row' : 'column'}
        alignItems="center"
        justify="center"
        spacing={2}
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
  typeOfLesson: state.typeOfLesson,
})

export default connect(mapStateToProps, { getLessonById })(ChooseDuration)
