import React from 'react'
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from 'formik'
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormHelperText,
} from '@material-ui/core'

const MuiRadioGroup = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  const { error, touched } = meta

  const errors = touched && Boolean(error)

  return (
    <FormControl component="fieldset" error={error}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label="type-of-teacher" {...field} {...props}>
        <FormControlLabel
          value="professional"
          control={<Radio />}
          label="Giáo viên chuyên nghiệp"
        />
        <FormControlLabel
          value="commutor"
          control={<Radio />}
          label="Giáo viên cộng đồng"
        />
      </RadioGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  )
}

export default MuiRadioGroup
