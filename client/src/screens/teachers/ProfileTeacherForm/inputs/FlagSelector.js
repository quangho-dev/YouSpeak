import React from 'react'
import ReactFlagsSelect from 'react-flags-select'
import 'react-flags-select/css/react-flags-select.css'
import { useFormikContext } from 'formik'

const FlagSelector = () => {
  const { setFieldValue, values } = useFormikContext()

  return (
    <ReactFlagsSelect
      searchable={true}
      placeholder="Hãy chọn Quốc Gia"
      defaultCountry={values.hometown || 'VN'}
      // selected={values.hometown}
      onSelect={(val) => {
        setFieldValue('hometown', val)
      }}
    />
  )
}

export default FlagSelector
