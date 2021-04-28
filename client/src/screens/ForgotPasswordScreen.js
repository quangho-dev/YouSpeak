import React, { useState } from 'react'
import { Typography, Button, TextField, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { sendForgotPassword } from '../actions/resetPassword'

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    padding: '0 4em',
  },
  formControl: {
    marginBottom: '1em',
  },
}))

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(sendForgotPassword(email))
  }

  return (
    <div className={classes.rowContainer}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Quên mật khẩu
          </Typography>
        </Grid>
        <Grid item>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Nhập email dùng để đặt lại mật khẩu"
              type="text"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className={classes.formControl}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ color: 'white' }}
              disableRipple
            >
              Gửi email
            </Button>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}

export default ForgotPasswordScreen
