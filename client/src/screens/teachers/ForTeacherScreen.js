import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

const ForTeacherScreen = () => {
  const useStyles = makeStyles((theme) => ({
    rowContainer: {
      paddingLeft: '1.5em',
      paddingRight: '1.5em',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: '3em',
        paddingRight: '3em',
      },
      [theme.breakpoints.up('md')]: {
        paddingLeft: '5em',
        paddingRight: '5em',
      },
    },
    linkText: {
      textTransform: 'uppercase',
      '&:hover, &:visited, &:active': {
        textTransform: 'uppercase',
        color: 'inherit',
      },
    },
  }))

  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.rowContainer}
      style={{ margin: '7em 0 2em' }}
    >
      <Grid
        item
        container
        alignItems="center"
        style={{ marginBottom: '1.5em' }}
      >
        <Grid item>
          <Link to="/">
            <ArrowBackIcon fontSize="large" color="primary" />
          </Link>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            component={Link}
            to="/"
            style={{
              fontWeight: '600',
              marginLeft: '0.5em',
              textDecoration: 'none',
            }}
            className={classes.linkText}
          >
            Back to homepage
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item>
            <Button
              component={Link}
              to="/teachers/login"
              variant="contained"
              color="primary"
              size="large"
              style={{ color: 'white', fontWeight: '600' }}
              disableRipple
            >
              Sign in teacher account
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/teachers/register-teacher"
              variant="contained"
              color="primary"
              size="large"
              style={{ color: 'white', fontWeight: '600' }}
              disableRipple
            >
              Sign up teacher account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ForTeacherScreen
