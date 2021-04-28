import React from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import formatMoney from '../../../utils/formatMoney'
import { useFormikContext } from 'formik'

const LessonList = ({ lessons, nextPage }) => {
  const { setFieldValue } = useFormikContext()

  const handleClick = (lessonId) => {
    setFieldValue('lesson', lessonId)
    nextPage()
  }

  const getMinPeriodPrice = (periods) => {
    const periodsValuesArray = Object.values(periods)
    const priceArray = periodsValuesArray.map((item) => item.price)
    const filteredUndefinedArray = priceArray.filter(
      (item) => item !== undefined && item !== 0
    )
    return Math.min(...filteredUndefinedArray)
  }

  return (
    <TableContainer component={Paper} style={{ background: '#fff' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên bài học</TableCell>
            <TableCell align="right">Giá thấp nhất từ</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons &&
            lessons.map((lesson) => {
              return (
                <TableRow key={lesson._id}>
                  <TableCell component="th" scoppe="row">
                    {lesson.lessonName}
                  </TableCell>
                  <TableCell align="right">
                    {formatMoney(getMinPeriodPrice(lesson.periods[0]))}&nbsp;VNĐ
                  </TableCell>
                  <TableCell aign="right">
                    <MyButton
                      onClick={() => {
                        handleClick(lesson._id)
                      }}
                    >
                      Chọn
                    </MyButton>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LessonList
