import React, { useEffect } from 'react'
import { Grid, Typography, Card, CardContent } from '@material-ui/core'
import { syncSuccessfulOrder } from '../../actions/learningScheduleForStudent'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import formatMoney from '../../utils/formatMoney'
import { viLocale } from 'date-fns/locale/vi'
import convertMillisecondsToMinutes from '../../utils/convertMillisecondsToMinutes'
import Spinner from '../ui/Spinner'

const ZaloPaySuccessScreen = ({
  syncSuccessfulOrder,
  learningScheduleForStudent: { bookedLesson, loading },
}) => {
  const search = useLocation().search
  const apptransid = new URLSearchParams(search).get('apptransid')

  useEffect(() => {
    syncSuccessfulOrder(apptransid)
  }, [syncSuccessfulOrder, apptransid])

  if (loading || !bookedLesson) {
    return <Spinner />
  }

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="container"
      spacing={2}
      style={{ width: '100%', margin: '0' }}
    >
      <Grid item>
        <Typography variant="h4" component="h4">
          Bạn đã đặt bài học thành công!
        </Typography>
      </Grid>

      <Grid item>
        <Card>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{ textAlign: 'center' }}
                >
                  Thông tin bài học:
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  <strong>Tên bài học:</strong>&nbsp;
                  {bookedLesson &&
                    bookedLesson.lesson &&
                    bookedLesson.lesson.lessonName}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  <strong>Tên giáo viên:</strong>&nbsp;
                  {bookedLesson &&
                    bookedLesson.teacher &&
                    bookedLesson.teacher.name}
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body1">
                  <strong>Giá tiền:</strong>&nbsp;
                  {bookedLesson && formatMoney(`${bookedLesson.price}`)}
                  &nbsp;VNĐ
                </Typography>
              </Grid>

              {bookedLesson && (
                <Grid item>
                  <Typography variant="body1">
                    <strong>Thời lượng:</strong>&nbsp;
                    {convertMillisecondsToMinutes(bookedLesson.duration)}
                    &nbsp;phút
                  </Typography>
                </Grid>
              )}

              {bookedLesson &&
                bookedLesson.bookedTime &&
                bookedLesson.bookedTime[0] && (
                  <Grid item>
                    <Typography variant="body1">
                      <strong>Thời gian bắt đầu:</strong>&nbsp;
                      {format(
                        new Date(bookedLesson.bookedTime[0].start),
                        'hh:mm a, dd/MM/yyyy'
                      )}
                    </Typography>
                  </Grid>
                )}

              {bookedLesson &&
                bookedLesson.bookedTime &&
                bookedLesson.bookedTime[0] && (
                  <Grid item>
                    <Typography variant="body1">
                      <strong>Thời gian kết thúc:</strong>&nbsp;
                      {format(
                        new Date(bookedLesson.bookedTime[0].end),
                        'hh:mm a, dd/MM/yyyy'
                      )}
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  learningScheduleForStudent: state.learningScheduleForStudent,
})

export default connect(mapStateToProps, { syncSuccessfulOrder })(
  ZaloPaySuccessScreen
)
