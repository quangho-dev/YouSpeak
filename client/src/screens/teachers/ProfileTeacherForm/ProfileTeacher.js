import React, { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { Formik, Form } from 'formik'
import 'date-fns'
import {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
} from '../../../actions/profileTeacher'
import * as yup from 'yup'
import { makeStyles, useTheme } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import ProfileTeacherPage1 from './ProfileTeacherPage1'
import ProfileTeacherPage2 from './ProfileTeacherPage2'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Spinner from '../../../components/ui/Spinner'
import { connect } from 'react-redux'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles((theme) => ({
  card: {
    // Provide some spacing between cards
    margin: 16,

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

const ProfileTeacher = ({
  profileTeacher: { loading, profileTeacher },
  history,
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
}) => {
  const [formData, setFormData] = useState(null)

  const [page, setPage] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  const initialValues = {
    hometown: '',
    degreeImages: [],
    expImages: [],
    lessons: [],
    phoneNumber: '',
    user: null,
    skypeId: '',
    dateOfBirth: null,
    introduction: '',
    teacherAvatar: null,
    thumbnail: null,
    typeOfTeacher: '',
    video: '',
    lesson: '',
    nameOnCard: '',
    bankName: '',
    cardNumber: '',
  }

  // cac step trong stepper
  const getSteps = () => {
    return ['Choose a type of teacher', 'Fill your profile as a teacher']
  }

  const steps = getSteps()

  const classes = useStyles()

  // buoc ke tiep cua stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // tro ve cua stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Proceed to next page
  const nextPage = () => {
    setPage(page + 1)
    handleNext()
  }

  // Go back to prev page
  const prevPage = () => {
    setPage(page - 1)
    handleBack()
  }

  const pages = [
    <ProfileTeacherPage1 nextPage={nextPage} />,
    <ProfileTeacherPage2 nextPage={nextPage} prevPage={prevPage} />,
  ]

  const validationSchema = yup.object().shape({
    dateOfBirth: yup.date().nullable(),
    hometown: yup.object().nullable().required('Required'),
    skypeId: yup.string().required('Required'),
    phoneNumber: yup.number().required('Required'),
    introduction: yup.string().required('Required'),
    video: yup.string().required('Required'),
    degreeImages: yup.array().when('typeOfTeacher', {
      is: 'professional',
      then: yup.array().required('Required'),
    }),
    expImages: yup.array().when('typeOfTeacher', {
      is: 'professional',
      then: yup.array().required('Required'),
    }),
  })

  useEffect(() => {
    if (!profileTeacher) getCurrentProfileTeacher()
    if (!loading && profileTeacher) {
      setFormData({
        hometown: profileTeacher.hometown,
        degreeImages: profileTeacher.degreeImages,
        expImages: profileTeacher.expImages,
        lessons: profileTeacher.lessons,
        phoneNumber: profileTeacher.phoneNumber,
        user: profileTeacher.user,
        skypeId: profileTeacher.skypeId,
        dateOfBirth: profileTeacher.dateOfBirth,
        introduction: profileTeacher.introduction,
        teacherAvatar: profileTeacher.teacherAvatar,
        selectedTeacherAvatarFile: null,
        thumbnail: profileTeacher.thumbnail,
        typeOfTeacher: profileTeacher.typeOfTeacher,
        video: profileTeacher.video,
        lesson: profileTeacher.lesson,
        bankName: profileTeacher.bankName,
        cardNumber: profileTeacher.cardNumber,
        nameOnCard: profileTeacher.nameOnCard,
      })
    }
  }, [getCurrentProfileTeacher, loading, profileTeacher])

  return (
    <>
      {loading && profileTeacher === null ? (
        <Spinner />
      ) : (
        <Formik
          enableReinitialize
          initialValues={formData || initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const {
              teacherAvatar,
              dateOfBirth,
              typeOfTeacher,
              hometown,
              skypeId,
              video,
              thumbnail,
              degreeImages,
              expImages,
              introduction,
              phoneNumber,
              nameOnCard,
              cardNumber,
              bankName,
            } = values
            setTimeout(() => {
              createOrUpdateProfileTeacher(
                {
                  teacherAvatar,
                  dateOfBirth,
                  typeOfTeacher,
                  hometown,
                  skypeId,
                  video,
                  degreeImages,
                  expImages,
                  thumbnail,
                  introduction,
                  phoneNumber,
                  nameOnCard,
                  cardNumber,
                  bankName,
                },
                history,
                profileTeacher ? true : false
              )
              setSubmitting(false)
              history.push('/teachers/dashboard')
            }, 400)
          }}
        >
          {({ values, isSubmitting, isValid }) => (
            <Form autoComplete="off">
              <Grid
                container
                className="container"
                direction="column"
                justify="center"
              >
                <Grid item container alignItems="center">
                  <Grid item>
                    <Link to="/teachers/dashboard">
                      <ArrowBackIcon fontSize="large" color="primary" />
                    </Link>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="body2"
                      component={Link}
                      to="/teachers/dashboard"
                      style={{
                        fontWeight: '600',
                        marginLeft: '0.5em',
                        textDecoration: 'none',
                      }}
                      className={classes.linkText}
                    >
                      Back
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  {matchesMD && (
                    <Stepper
                      activeStep={activeStep}
                      alternativeLabel
                      style={{ backgroundColor: 'transparent' }}
                    >
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  )}
                </Grid>

                {pages[page]}

                <Grid
                  item
                  container
                  justify="center"
                  alignItems="center"
                  spacing={3}
                  style={{ marginTop: '1em', width: '100%', margin: 0 }}
                >
                  {page !== 0 && (
                    <Grid item>
                      <Button
                        onClick={() => prevPage()}
                        color="primary"
                        variant="contained"
                        disableRipple
                        style={{ color: 'white' }}
                      >
                        <Grid container justify="center" alignItems="center">
                          <Grid item>
                            <ArrowBackIcon style={{ fontSize: '1.5rem' }} />
                          </Grid>

                          <Grid item>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: '500' }}
                            >
                              &nbsp;Back
                            </Typography>
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>
                  )}
                  {page === pages.length - 1 ? (
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disableRipple
                        disabled={!isValid || isSubmitting}
                        style={{ color: 'white' }}
                      >
                        <Grid container justify="center" alignItems="center">
                          <Grid item>
                            <SaveIcon style={{ fontSize: '1.5rem' }} />
                          </Grid>

                          <Grid item>
                            <Typography
                              variant="body1"
                              style={{ fontWeight: '500' }}
                            >
                              &nbsp;Save
                            </Typography>
                          </Grid>
                        </Grid>
                      </Button>
                    </Grid>
                  ) : page !== 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        nextPage()
                      }}
                      disableRipple
                      style={{ color: 'white' }}
                    >
                      Next
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  profileTeacher: state.profileTeacher,
})

export default connect(mapStateToProps, {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
})(ProfileTeacher)
