import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const TeacherConfirmationSuccessScreen = () => {
  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Bạn đã kích hoạt tài khoản giáo viên thành công!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component={Link}
            to="/teachers/login"
            variant="contained"
            color="primary"
            style={{ color: 'white' }}
          >
            Đăng nhập tài khoản giáo viên
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default TeacherConfirmationSuccessScreen
