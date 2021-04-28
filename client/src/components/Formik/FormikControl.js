import React from 'react'
import MuiInput from './MuiInput'

function FormikControl(props) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <MuiInput {...rest} />
    // case 'textarea':
    //   return <Textarea {...rest} />
    // case 'select':
    //   return <Select {...rest} />
    // case 'radio':
    //   return <RadioButtons {...rest} />
    // case 'checkbox':
    //   return <CheckboxGroup {...rest} />
    // case 'date':
    //   return <DatePicker {...rest} />
    // case 'chakraInput':
    //   return <ChakraInput {...rest} />
    default:
      return null
  }
}

export default FormikControl
