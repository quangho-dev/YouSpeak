import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link as RouterLink } from 'react-router-dom'
import './Footer.css'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'

const useStyles = makeStyles({
  footerContainer: {
    padding: '1em 10em',
    backgroundColor: '#333',
  },
  MuiTypography: {
    colorPrimary: '#fff',
  },
})
const Footer = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="main-footer"
    >
      <Grid item container justify="space-between">
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Dạy tiếng Anh
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                paragraph
                className={classes.footerLink}
              >
                <RouterLink to="/teachers/register-teacher">
                  Trở thành giáo viên
                </RouterLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6" gutterBottom>
                Học tiếng Anh
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                paragraph
                className={classes.footerLink}
              >
                <RouterLink to="/login">Đăng ký tài khoản học sinh</RouterLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Liên hệ:</Typography>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <Typography vairant="body1">
                  &nbsp;<strong>Email: </strong>support@youspeak.com
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item>
                <PhoneIcon />
              </Grid>
              <Grid item>
                <Typography vairant="body1">
                  &nbsp;<strong>Hotline: </strong>0944 81 01 81
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ marginBottom: '1em' }}>
        <Typography variant="body2">
          &copy;{new Date().getFullYear()} YouSpeak
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer
