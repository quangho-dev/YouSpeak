import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  SwipeableDrawer,
  Avatar,
  Menu,
  MenuItem,
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
    color: '#2f1700',
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
    paddingLeft: '2em',
    paddingRight: '2em',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '4em',
      paddingRight: '4em',
    },
  },
}))

const StudentLoggedInNav = ({ user, profile, logout }) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onMouseOverHandler = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const onClickLogOutDrawerHandler = () => {
    logout()
    setOpenDrawer(false)
  }

  const onClickLessonsManagerDrawerHandler = () => {
    history.push('/students/lessons-manager')
    setOpenDrawer(false)
  }

  const logoutHandler = () => {
    logout()
    setAnchorEl(null)
    history.push('/')
  }

  const onClickContacUsDrawerHandler = () => {
    history.push('/contact-us')
    setOpenDrawer(false)
  }

  const onClickDashboardDrawerHandler = () => {
    history.push('/dashboard')
    setOpenDrawer(false)
  }

  const onClickFindATeacherDrawerHandler = () => {
    history.push('/teachers/english')
    setOpenDrawer(false)
  }

  const tabsStudentLoggedIn = (
    <Grid item container alignItems="center">
      {user && user.role !== 'teacher' && (
        <Grid item>
          <Button
            component={Link}
            to="/dashboard"
            variant="text"
            style={{
              color: '#333',
              textTransform: 'none',
              marginRight: '1.5em',
            }}
          >
            Trang chính
          </Button>
        </Grid>
      )}

      {user && user.role !== 'teacher' && (
        <Grid item>
          <Button
            component={Link}
            to="/teachers/english"
            variant="text"
            style={{
              color: '#333',
              textTransform: 'none',
              marginRight: '1.5em',
            }}
          >
            Tìm một giáo viên
          </Button>
        </Grid>
      )}

      {user && user.role !== 'teacher' && (
        <Grid item>
          <Button
            component={Link}
            to="/students/lessons-manager"
            variant="text"
            style={{
              color: '#333',
              textTransform: 'none',
              marginRight: '1.5em',
            }}
          >
            Quản lý bài học
          </Button>
        </Grid>
      )}

      <Grid item>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onMouseOver={onMouseOverHandler}
        >
          {user && profile && profile.imageAvatar && user.role === 'user' && (
            <Avatar
              style={{ width: '3em', height: '3em', borderRadius: '50%' }}
              src={null || profile.imageAvatar}
              alt="user-avatar"
            />
          )}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            onMouseLeave: handleClose,
          }}
          elevation={0}
          style={{ zIndex: 1302 }}
          classes={{ paper: classes.menu }}
        >
          {user && user.role !== 'teacher' && (
            <MenuItem
              component={Link}
              classes={{ root: classes.menuItem }}
              onClick={handleClose}
              to="/dashboard"
              disableRipple
            >
              Màn hình chính
            </MenuItem>
          )}
          {user && user.role !== 'teacher' && (
            <MenuItem
              component={Link}
              classes={{ root: classes.menuItem }}
              onClick={handleClose}
              to="/students/lessons-manager"
            >
              Quản lý bài học
            </MenuItem>
          )}
          <MenuItem
            classes={{ root: classes.menuItem }}
            onClick={logoutHandler}
          >
            {user && user.role !== 'teacher' && 'Đăng xuất'}
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )

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
              onClick={onClickDashboardDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
              variant="text"
            >
              Trang chính
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={onClickFindATeacherDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
              variant="text"
            >
              Tìm một giáo viên
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              onClick={onClickLessonsManagerDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
            >
              Quản lý bài học
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="text"
              onClick={onClickContacUsDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
            >
              Liên hệ
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="text"
              onClick={onClickLogOutDrawerHandler}
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
            >
              Thoát
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
    <ElevationScroll>
      <AppBar position="fixed" className={classes.appbarLoggedIn}>
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
                {logo && (
                  <img alt="company-logo" className={classes.logo} src={logo} />
                )}
              </Button>
            </Grid>
            <Grid item>{matchesSM ? tabsStudentLoggedIn : drawer}</Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}

export default StudentLoggedInNav
