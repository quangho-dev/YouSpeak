import React from 'react'
import { Grid, TextField, Checkbox, FormControlLabel } from '@material-ui/core'
import { useFormikContext } from 'formik'

const LessonPeriodForm = ({
  fieldCheckbox,
  label,
  valueCheckbox,
  fieldPrice,
  valuePrice,
}) => {
  const { setFieldValue } = useFormikContext()

  const handleChange = (e) => {
    setFieldValue(fieldCheckbox, !valueCheckbox)
  }

  const handleChangePrice = (e) => {
    setFieldValue(fieldPrice, e.target.value)
  }

  return (
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox checked={valueCheckbox} onChange={handleChange} />
            }
            label={label}
          />
        </Grid>
        <Grid item>
          <TextField
            error={valueCheckbox && valuePrice <= 0}
            variant="outlined"
            type="number"
            label="Price (VNĐ):"
            value={valuePrice}
            onChange={handleChangePrice}
            helperText={
              valueCheckbox && valuePrice <= 0 ? 'Vui lòng điền giá tiền' : ''
            }
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LessonPeriodForm
