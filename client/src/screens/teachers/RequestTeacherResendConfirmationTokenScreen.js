import React, { useState } from 'react'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { resendConfirmationToken } from '../../actions/authTeacher'

const RequestTeacherResendConfirmationTokenScreen = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(resendConfirmationToken(email))
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Yêu cầu gửi lại đường link để kích hoạt tài khoản:
          </Typography>
        </Grid>
        <Grid item>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <TextField
                  onChange={handleChange}
                  value={email}
                  label="Điền email"
                  style={{ minWidth: '10em' }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={{ color: 'white', minWidth: '10em', marginTop: '1em' }}
                  disableRipple
                >
                  Gửi
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default RequestTeacherResendConfirmationTokenScreen
