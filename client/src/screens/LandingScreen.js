import React, { Fragment } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link, Redirect } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import IconButton from '@material-ui/core/IconButton'
import { Link as LinkScroll } from 'react-scroll'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useSelector } from 'react-redux'
import landing1 from '../assets/landing1.jpg'
import customize from '../assets/landing-page/customize.jpg'
import pay from '../assets/landing-page/pay.jpg'
import time from '../assets/landing-page/time.jpg'
import chooseTeacher from '../assets/landing-page/chooseTeacher.jpg'
import schedule from '../assets/landing-page/schedule.jpg'
import startToLearn from '../assets/landing-page/start-to-learn.jpg'

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${landing1})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
    padding: '0 1em',
  },
  overlay: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  arrowDownContainer: {
    position: 'absolute',
    bottom: '2em',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
  arrowDown: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.5em',
    height: '2.5em',
    borderRadius: '50%',
    backgroundColor: '#eee',
  },
  teacherShowcaseCard: {
    maxWidth: '240px',
  },
  rowContainer: {
    padding: '0 1em',
    [theme.breakpoints.up('sm')]: {
      padding: '0 3em',
    },
  },
  avatar: {
    height: '7em',
    width: '7em',
  },
  media: {
    width: '100%',
  },
  howItWorksDescription: {
    maxWidth: '25em',
  },
}))

const Landing = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, user } = auth

  if (isAuthenticated && user.role === 'user') {
    return <Redirect to="/dashboard" />
  }

  if (isAuthenticated && user.role === 'teacher') {
    return <Redirect to="/teachers/dashboard" />
  }

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.background}
      >
        <Grid item className={classes.overlay}></Grid>
        <Grid
          container
          item
          direction="column"
          style={{
            maxWidth: '60em',
            zIndex: 1,
            textAlign: 'center',
            paddingRight: matchesSM ? '1em' : undefined,
            paddingleft: matchesSM ? '1em' : undefined,
          }}
        >
          <Grid item>
            <Typography
              variant="h3"
              gutterBottom
              style={{
                color: 'white',
                fontWeight: matchesSM ? 700 : 500,
                textTransform: 'uppercase',
                fontSize: '2.5rem',
                padding: '0 0.2em',
              }}
            >
              Trở nên thành thạo tiếng Anh
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              style={{
                color: 'white',
                fontSize: matchesSM ? '1.5rem' : '1.5rem',
              }}
            >
              Hãy chọn một giáo viên dạy 1 kèm 1 dựa vào mục tiêu và sở thích
              của bạn.
            </Typography>
          </Grid>
          <Grid item container justify="center" alignItems="center">
            <Button
              variant="contained"
              component={Link}
              color="primary"
              size="large"
              style={{ color: 'white', padding: '1em 2em', fontSize: '1rem' }}
              to="/teachers/english"
            >
              Tìm một giáo viên
              <SearchIcon style={{ marginLeft: '5px', fontSize: '2rem' }} />
            </Button>
          </Grid>
        </Grid>

        <Grid item container className={classes.arrowDownContainer}>
          <Grid item container className={classes.arrowDown}>
            <Grid item>
              <LinkScroll
                activeClass="active"
                to="why-choose-youspeak"
                spy={true}
                smooth={true}
                offset={-72}
                duration={500}
              >
                <IconButton>
                  <ArrowDownwardIcon style={{ fontSize: '1rem' }} />
                </IconButton>
              </LinkScroll>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Why YouSpeak */}
      <Grid
        id="why-choose-youspeak"
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          paddingTop: '5em',
          margin: 'auto',
        }}
        className={classes.rowContainer}
      >
        <Grid item>
          <Typography
            variant="h4"
            style={{ fontWeight: '500', textAlign: 'center' }}
          >
            Tại sao chọn YouSpeak?
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction={matchesLG ? 'row' : 'column'}
          justify="center"
          alignItems="center"
          spacing={4}
          style={{ margin: 0, maxWidth: matchesSM ? '80%' : '100%' }}
        >
          <Grid item lg={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Cá nhân hóa việc học"
                className={classes.media}
                image={customize}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  Cá nhân hóa việc học
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Chọn một giáo viên cho bài học 1 kèm 1, tùy theo mục tiêu và
                  sở thích của bạn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card>
              <CardMedia
                component="img"
                alt="thanh toán trên mỗi bài học"
                className={classes.media}
                image={pay}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  Thanh toán trên mỗi bài học
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Bạn sẽ chỉ thanh toán sau mỗi bài học với mức giá phù hợp với
                  ngân sách của bạn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={4}>
            <Card>
              <CardMedia
                component="img"
                alt="Tùy ý chọn thời gian và địa điểm"
                className={classes.media}
                image={time}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  Tùy ý chọn thời gian và địa điểm.
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Tham gia lớp học online vào thời gian và địa điểm phù hợp với
                  bạn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      {/* How it works */}
      <Grid
        container
        alignItems="center"
        direction="column"
        style={{
          marginTop: '5em',
          paddingBottom: '5em',
        }}
        className={classes.rowContainer}
      >
        <Grid item>
          <Typography
            variant="h4"
            style={{ fontWeight: '500', textAlign: 'center' }}
          >
            Cách học trên YouSpeak
          </Typography>
        </Grid>

        <Grid
          container
          item
          justify="space-between"
          alignItems="center"
          style={{ marginTop: '2em', width: '100%' }}
          className={classes.rowContainer}
        >
          <Grid item md={5}>
            <img
              src={chooseTeacher}
              alt="Chọn giáo viên"
              style={{ maxWidth: '100%' }}
            />
          </Grid>
          <Grid item md={5}>
            <Grid container direction="column">
              <Grid item>
                <p style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  <span style={{ fontSize: '2em' }}>1</span>. Chọn giáo viên
                </p>
              </Grid>
              <Grid item className={classes.howItWorksDescription}>
                <Typography variant="body2">
                  Xem video giới thiệu của giáo viên và đọc nhận xét của các học
                  viên khác.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          justify="space-between"
          alignItems="center"
          className={classes.rowContainer}
          style={{ marginTop: '3em', marginBottom: '3em' }}
        >
          <Grid item style={{ order: matchesMD ? '1' : undefined }} md={5}>
            <img
              src={schedule}
              alt="Đặt lịch hẹn"
              style={{ maxWidth: '100%' }}
            />
          </Grid>
          <Grid item className={classes.howItWorksDescription} md={5}>
            <Grid container direction="column">
              <Grid item>
                <p style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  <span style={{ fontSize: '2em' }}>2</span>. Đặt lịch hẹn
                </p>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Đặt lịch hẹn vào thời gian và địa điểm phù hợp với bạn.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          justify="space-between"
          alignItems="center"
          className={classes.rowContainer}
        >
          <Grid item md={5}>
            <img
              src={startToLearn}
              alt="Đặt lịch hẹn"
              style={{ maxWidth: '100%' }}
            />
          </Grid>
          <Grid item className={classes.howItWorksDescription} md={5}>
            <Grid container direction="column">
              <Grid item>
                <p style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  <span style={{ fontSize: '2em' }}>3</span>. Bắt đầu học
                </p>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Kết nối với giáo viên qua các phần mềm video chat và bắt đầu
                  học!
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Landing
