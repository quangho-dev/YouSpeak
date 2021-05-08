import React from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  useMediaQuery,
} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import ButtonInput from './inputs/ButtonInput'

const useStyles = makeStyles((theme) => ({
  card: {
    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    display: 'flex',
    flexDirection: 'column',

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    justifyContent: 'space-between',
  },
  paddingContainer: {
    padding: '0 4em',
  },
  linkText: {
    textTransform: 'uppercase',
    '&:hover, &:visited, &:active': {
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
  formControl: {
    marginBottom: '1em',
  },
  rowContainer: {
    padding: '0 4em',
  },
  degreeImageCard: {
    maxWidth: 300,
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  expImageCard: {
    maxWidth: 300,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const ProfileTeacherPage1 = ({ setFieldValue, nextPage }) => {
  const classes = useStyles()

  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid item container alignItems="center" justify="center" directon="column">
      <Grid item>
        <Typography
          gutterBottom
          style={{
            textTransform: 'uppercase',
            fontWeight: '600',
            textAlign: 'center',
          }}
          variant={matchesMD ? 'h4' : 'h5'}
        >
          Choose a type of teacher
        </Typography>
      </Grid>
      <Grid
        item
        container
        justify={matchesMD ? 'space-around' : 'center'}
        direction={matchesMD ? 'row' : 'column'}
      >
        <Grid
          md={5}
          item
          component={Card}
          className={classes.card}
          style={{ marginBottom: '2em' }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              style={{
                textTransform: 'uppercase',
                textAlign: 'center',
              }}
            >
              Professional teacher
            </Typography>
            <h4>* Benefits:</h4>
            <ul>
              <li>
                Your profile is displayed as a professional teacher, increase
                credibility.
              </li>
            </ul>
            <h4>* Requirements:</h4>
            <ul>
              <li>
                Provide us your scanned images of teaching certificates and
                teaching experiences.
              </li>
              <li>A introduction video of 1 - 3 minutes length.</li>
            </ul>
          </CardContent>
          <CardActions>
            <div
              style={{ width: '100%', textAlign: 'center', marginTop: '1em' }}
            >
              <ButtonInput value="professional" nextPage={nextPage} />
            </div>
          </CardActions>
        </Grid>

        <Grid md={5} item component={Card} className={classes.card}>
          <CardContent>
            <div style={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                component="h2"
                style={{ textTransform: 'uppercase' }}
              >
                Community Tutor
              </Typography>
            </div>
            <h4>* Benefits:</h4>
            <ul>
              <li>Your profile is displayed as a community tutor.</li>
            </ul>
            <h4>* Requirements:</h4>
            <ul>
              <li>A introduction video of 1 - 3 minutes length.</li>
            </ul>
          </CardContent>
          <CardActions>
            <div
              style={{ width: '100%', textAlign: 'center', marginTop: '1em' }}
            >
              <ButtonInput value="commutor" nextPage={nextPage} />
            </div>
          </CardActions>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ProfileTeacherPage1
