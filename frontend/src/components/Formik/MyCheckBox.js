import React from 'react'
import { useField } from 'formik'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const MyCheckBox = (props) => {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value
  });

  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}

export default MyCheckBox
