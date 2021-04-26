import React, { useMemo } from 'react'
import { useFormikContext } from 'formik'
import Select from 'react-select'
import countryList from 'react-select-country-list'

const ProfileCountrySelector = () => {
  const options = useMemo(() => countryList().getData(), [])

  const { setFieldValue, values } = useFormikContext()

  const changeHandler = (value) => {
    setFieldValue('hometown', value)
  }

  return (
    <Select
      options={options}
      value={values.hometown}
      onChange={changeHandler}
    />
  )
}

export default ProfileCountrySelector
