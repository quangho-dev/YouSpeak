import React from 'react'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import { useField, useFormikContext } from 'formik'

const CheckBox = ({ label, label1, label2, label3, label4, ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  const { fieldValue1, fieldValue2, fieldValue3, fieldValue4 } = field
  return (
    <FormControl
      required
      error={meta.touched && Boolean(meta.error)}
      component="fieldset"
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={fieldValue1}
              name={fieldValue1}
              {...field.fieldValue1}
              {...props}
            />
          }
          label={label1}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fieldValue2}
              name="googleHangouts"
              {...field.fieldValue2}
              {...props}
            />
          }
          label={label2}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fieldValue3}
              name="viper"
              {...field.fieldValue3}
              {...props}
            />
          }
          label={label3}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fieldValue4}
              name="facetime"
              {...field.fieldValue4}
              {...props}
            />
          }
          label={label4}
        />
      </FormGroup>
      {meta.error && <FormHelperText>{meta.error}</FormHelperText>}
    </FormControl>
  )
}

export default CheckBox
