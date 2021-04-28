import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import DatePicker from 'material-ui-pickers/DatePicker'

const MyDatePicker = ({
  name,
  form: { setFieldValue },
  field: { value },
  ...rest
}) => {
  // console.log(rest);
  return (
    // <KeyboardDatePicker
    //   name={name}
    //   margin="normal"
    //   id="date-picker-dialog"
    //   label="Ngày tháng năm sinh"
    //   format="dd/MM/yyyy"
    //   onChange={value => {
    //     setFieldValue(name, value);
    //   }}
    //   value={value}
    // />
    <DatePicker
      name={name}
      keyboard
      clearable
      autoOk
      label="Masked input"
      format="dd/MM/yyyy"
      placeholder="10/10/2018"
      // handle clearing outside => pass plain array if you are not controlling value outside
      mask={(value) =>
        value
          ? [/[0-3]/, /\d/, '/', /0|1/, /\d/, '/', /1|2/, /\d/, /\d/, /\d/]
          : []
      }
      disableOpenOnEnter
      onChange={(value) => {
        console.log('setting value to', value)
        setFieldValue('date', value)
      }}
      value={value}
      animateYearScrolling={false}
    />
  )
}

export default MyDatePicker
