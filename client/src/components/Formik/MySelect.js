import React from 'react'

const MySelect = ({...props, label}) => {
  const [field] = useField(props)

  return (
    <FormControlLabel {...field}>
      <InputLabel>{label}</InputLabel>
      <Select>
      </Select>
    </FormControlLabel>
  )
}

export default MySelect
