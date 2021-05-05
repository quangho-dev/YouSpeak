import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  SwipeableDrawer,
} from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.png'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '4em',
    background: 'transparent',
    color: 'white',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
    marginRight: '2em',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
    color: 'white',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.green,
    paddingTop: '7em',
  },
  drawerAvatar: {
    backgroundColor: 'white',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: '#444',
    opacity: 0.7,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  appbarLoggedIn: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: 'white',
  },
  avatar: {
    margin: '0.7em',
    backgroundColor: theme.palette.common.green,
  },
  form: {
    maxWidth: '22em',
  },
  formControl: {
    marginBottom: '1em',
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '1em',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    color: '#555',
    '&:hover': {
      opacity: 1,
      color: '#555',
    },
  },
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
}))

const tabs = (
  <Grid item container>
    <Grid item>
      <Button
        component={Link}
        to="/login"
        style={{
          color: 'white',
          marginRight: '1.5em',
          textTransform: 'none',
        }}
      >
        Đăng nhập
      </Button>
    </Grid>
    <Grid item>
      <Button
        to="/register-user"
        component={Link}
        style={{
          color: 'white',
          marginRight: '1.5em',
          textTransform: 'none',
        }}
      >
        Đăng ký
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant="text"
        component={Link}
        to="/for-teacher"
        style={{ color: 'white', textTransform: 'none' }}
      >
        For English teachers
      </Button>
    </Grid>

    <Grid item>
      <Button
        variant="text"
        component={Link}
        to="/contact-us"
        style={{ color: 'white', textTransform: 'none' }}
      >
        Liên hệ với chúng tôi
      </Button>
    </Grid>
  </Grid>
)

const NotLoggedInNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const history = useHistory()

  const onClickLogInDrawerHandler = () => {
    history.push('/login')
    setOpenDrawer(false)
  }

  const onClickRegisterDrawerHandler = () => {
    history.push('/register-user')
    setOpenDrawer(false)
  }

  const onClickForTeachersDrawerHandler = () => {
    history.push('/for-teacher')
    setOpenDrawer(false)
  }

  const onClickContactUsDrawerHandler = () => {
    history.push('/contact-us')
    setOpenDrawer(false)
  }

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        style={{ width: '16em' }}
      >
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{ width: '14em' }}
        >
          <Grid item>
            <Button
              onClick={onClickLogInDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
              variant="text"
            >
              Đăng nhập
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={onClickRegisterDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
              variant="text"
            >
              Đăng ký
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              onClick={onClickForTeachersDrawerHandler}
              style={{ color: 'white', textTransform: 'none' }}
            >
              For English teachers
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={onClickContactUsDrawerHandler}
              style={{ color: 'white', textTransform: 'none' }}
            >
              Liên hệ với chúng tôi
            </Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar variant="dense" disableGutters>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              className={classes.rowContainer}
            >
              <Grid item>
                <Button
                  component={Link}
                  to="/"
                  disableRipple
                  className={classes.logoContainer}
                >
                  <img alt="company-logo" className={classes.logo} src={logo} />
                </Button>
              </Grid>

              <Grid item>{matchesSM ? tabs : drawer}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  )
}

export default NotLoggedInNav
