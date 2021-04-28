import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../actions/profile'
import Rating from '../components/ui/Rating'
import { connect } from 'react-redux'
import Spinner from '../components/ui/Spinner'
import moment from 'moment'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile: profileUser },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return (
    <>
      {user === null || profileUser === null ? (
        <Spinner />
      ) : (
        <Grid container direction="column" className="container">
          <Grid item style={{ alignSelf: 'center' }}>
            <Typography
              variant="h4"
              style={{ textTransform: 'uppercase', fontWeight: '600' }}
            >
              Trang chính
            </Typography>
          </Grid>

          <Grid item style={{ marginBottom: '2em' }}>
            <Typography variant="h4">Xin chào {user && user.name}</Typography>
          </Grid>

          <Grid item container direction="column">
            <Grid item>
              {profileUser && !profileUser.skypeId && (
                <Alert severity="error">
                  Bạn chưa điền Skype ID ở phần "Thông tin người dùng", vui lòng
                  điền số Skype ID.
                </Alert>
              )}
            </Grid>

            <Grid item>
              {profileUser && !profileUser.phoneNumber && (
                <Alert severity="error">
                  Bạn chưa điền số điện thoại ở phần "Thông tin người dùng", vui
                  lòng điền số điện thoại.
                </Alert>
              )}
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={6} style={{ marginRight: '3em' }}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      {user && (
                        <Chip
                          label={`ID: ${user._id}`}
                          style={{ marginBottom: '1em' }}
                        />
                      )}
                    </Grid>

                    <Grid item>
                      {profileUser && (
                        <Avatar
                          src={profileUser.imageAvatar}
                          style={{
                            width: '70px',
                            height: '70px',
                            marginBottom: '1em',
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                {user && (
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body1">
                          <strong>{user.name}</strong>
                        </Typography>
                      </Grid>
                      <Grid item style={{ marginLeft: '0.5em' }}>
                        <Button
                          component={Link}
                          variant="contained"
                          color="primary"
                          to="/create-profile"
                          style={{ color: 'white' }}
                        >
                          Chỉnh sửa profile
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {profileUser && (
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Typography variant="body1">
                      <strong>Địa chỉ:</strong>&nbsp;{profileUser.address}
                    </Typography>
                  </Grid>
                )}

                {profileUser && (
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Trình độ tiếng Anh:</strong>
                        </Typography>
                      </Grid>
                      <Grid item style={{ marginLeft: '0.5em' }}>
                        <Rating englishLevel={profileUser.englishLevel} />
                      </Grid>
                    </Grid>
                  </Grid>
                )}

                {profileUser && (
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Typography variant="body1">
                      <strong>Skype ID:</strong>&nbsp;{profileUser.skypeId}
                    </Typography>
                  </Grid>
                )}

                {profileUser && (
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Typography variant="body1">
                      <strong>Số điện thoại:</strong>&nbsp;
                      {profileUser.phoneNumber === 0
                        ? 'Chưa cung cấp'
                        : profileUser.phoneNumber}
                    </Typography>
                  </Grid>
                )}

                {profileUser && (
                  <Grid item style={{ marginBottom: '1em' }}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography variant="body1">
                          <strong>Thông tin thêm:</strong>
                        </Typography>
                      </Grid>
                      <Grid item style={{ marginLeft: '0.5em' }}>
                        <Typography variant="body1">
                          {profileUser.introduction}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ marginBottom: '1em' }}>
                  <Typography variant="body1">
                    <strong>Ngày tháng năm sinh:</strong>&nbsp;
                    {moment(profileUser.dateOfBirth).format('DD/MM/YYYY')}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Email:</strong>&nbsp;
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
