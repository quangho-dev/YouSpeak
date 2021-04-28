import React from 'react'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import convertMillisecondsToMinutes from '../../../utils/convertMillisecondsToMinutes'
import formatMoney from '../../../utils/formatMoney'
import moment from 'moment'

const BookedLessonInfo = ({ bookedLesson }) => {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography
              variant="h5"
              style={{ textTransform: 'uppercase', fontWeight: '500' }}
            >
              Thông tin bài học
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            style={{ marginTop: '1em' }}
          >
            <Grid item>
              <Typography variant="body1">
                <strong>Tên bài học:</strong>&nbsp;
                {bookedLesson &&
                  bookedLesson.lesson &&
                  bookedLesson.lesson.lessonName &&
                  bookedLesson.lesson.lessonName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <strong>Thời lượng:</strong>&nbsp;
                {bookedLesson &&
                  bookedLesson.duration &&
                  convertMillisecondsToMinutes(bookedLesson.duration)}{' '}
                phút
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <strong>Giá tiền:</strong>&nbsp;
                {bookedLesson &&
                  bookedLesson.price &&
                  formatMoney(bookedLesson.price)}{' '}
                VNĐ
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                <strong>Thời gian bắt đầu:</strong>&nbsp;
                {bookedLesson &&
                  bookedLesson.bookedTime &&
                  bookedLesson.bookedTime.length > 0 &&
                  moment(bookedLesson.bookedTime[0].start).format(
                    'HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY'
                  )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                <strong>Thời gian kết thúc:</strong>&nbsp;
                {bookedLesson && bookedLesson.duration === 1800000
                  ? moment(bookedLesson.bookedTime[0].start)
                      .add(30, 'minutes')
                      .format('HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY')
                  : bookedLesson && bookedLesson.duration === 2700000
                  ? moment(bookedLesson.bookedTime[0].start)
                      .add(45, 'minutes')
                      .format('HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY')
                  : bookedLesson &&
                    bookedLesson.duration &&
                    bookedLesson.duration === 3600000
                  ? moment(bookedLesson.bookedTime[0].start)
                      .add(60, 'minutes')
                      .format('HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY')
                  : null}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default BookedLessonInfo
