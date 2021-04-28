import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  avatarImg: {
    width: '4em',
    height: '4em',
  },
}))

const Dashboard = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <Grid container justify="center" spacing={2}>
        <Grid item sm={4}>
          <Card>
            <CardContent>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <span
                    style={{ backgroundColor: '#f7f7f7', padding: '0.5em' }}
                  >{`ID: 123`}</span>
                </Grid>
                <Grid item>
                  <Avatar src={user.imageAvatar} alt="avatar-image" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Grid item container direction='column' justify='center' alignItems='center' sm={4}>
        <Grid item>
              <span style={{backgroundColor: ''}}></span>
              </Grid>
          <Grid item><Avatar src={user.imageAvatar} alt='avatar-image' />
            </Grid>
            
      </Grid> */}
      {/* <Card style={{ maxWidth: '60vw', margin: 'auto' }}>
        <CardContent>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <p>ID: 123</p>
            </Grid>
            <Grid item>
              <Avatar
                className={classes.avatarImg}
                alt="avatar user"
                src="https://source.unsplash.com/random/300x300"
              />
            </Grid>
            <Grid item>
              <Link>Display Name</Link>
            </Grid>
            <Grid item>Address</Grid>
            <Grid item>English Level</Grid>
          </Grid>
        </CardContent>
      </Card> */}
    </div>
  )
}

export default Dashboard
