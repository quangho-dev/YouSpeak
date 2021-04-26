import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field } from 'formik';

function MuiInput(props) {
  const { label, name, type, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => (
        <TextField
          type={type}
          id={name}
          label={label}
          fullWidth
          error={form.errors[name] && form.touched[name]}
          helperText={form.errors[name]}
          {...rest}
          {...field}
        />
      )}
    </Field>
  );
}

export default MuiInput;
