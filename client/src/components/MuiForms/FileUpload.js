import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

const FileUpload = ({label}) => {
  return (
    <div>
      <FormControl>{label && <InputLabel>
        </InputLabel>
        }
        <Input>
        </Input>
        {error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </div>
  )
}

export default FileUpload
