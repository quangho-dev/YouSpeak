import React from 'react'
import { useFormikContext } from 'formik'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const MuiDatePicker = ({ ...props }) => {
  const { setFieldValue, values } = useFormikContext()

  const handleDateChange = (date) => {
    setFieldValue('dateOfBirth', date)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-of-birth"
        label="Date of birth"
        format="MM/dd/yyyy"
        value={values.dateOfBirth}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default MuiDatePicker
