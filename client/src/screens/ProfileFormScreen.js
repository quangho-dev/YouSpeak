import React, { useState, useEffect } from 'react'
import {
  Grid,
  Avatar,
  Button,
  LinearProgress,
  MenuItem,
  FormGroup,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import {
  getCurrentProfile,
  createOrUpdateProfile,
} from '../actions/profileStudent'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/styles'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
  formControl: {
    marginBottom: '1.5em',
    width: '100%',
  },
}))

const ProfileFormScreen = ({ history }) => {
  const classes = useStyles()

  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.up('sm'))
  const matchesLG = useMediaQuery(theme.breakpoints.up('lg'))

  const dispatch = useDispatch()

  const [imageAvatarState, setImageAvatarState] = useState('')
  const [addressState, setAddressState] = useState('')
  const [dateOfBirthState, setDateOfBirthState] = useState(null)
  const [genderState, setGenderState] = useState('')
  const [englishLevelState, setEnglishLevelState] = useState(0)
  const [communicationToolState, setCommunicationToolState] = useState([])
  const [introductionState, setIntroductionState] = useState('')
  const [skypeIdState, setSkypeIdState] = useState('')
  const [phoneNumberState, setPhoneNumberState] = useState('')

  const [uploading, setUploading] = useState(false)

  const profileStudent = useSelector((state) => state.profileStudent)
  const { loading, profile: profileUser } = profileStudent

  const validationSchema = yup.object().shape({
    dateOfBirth: yup.date().nullable(),
    phoneNumber: yup.string().required('Vui lòng điền số điện thoại'),
    skypeId: yup.string().required('Vui lòng điền Skype ID của bạn'),
  })

  useEffect(() => {
    if (!profileUser) {
      dispatch(getCurrentProfile())
    }
    if (!loading && profileUser) {
      setImageAvatarState(profileUser.imageAvatar)
      setAddressState(profileUser.address)
      setDateOfBirthState(profileUser.dateOfBirth)
      setGenderState(profileUser.gender)
      setEnglishLevelState(profileUser.englishLevel)
      setCommunicationToolState(profileUser.communicationTool)
      setIntroductionState(profileUser.introduction)
      setSkypeIdState(profileUser.skypeId)
      setPhoneNumberState(profileUser.phoneNumber)
    }
  }, [profileUser, loading, dispatch])

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.rowContainer}
      style={{ margin: '7em 0 2em' }}
    >
      <Grid item>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Chỉnh sửa Profile
        </Typography>
      </Grid>
      <Grid
        item
        style={{ minWidth: matchesLG ? '60%' : matchesSM ? '80%' : '100%' }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            imageAvatar: imageAvatarState,
            dateOfBirth: dateOfBirthState,
            gender: genderState,
            address: addressState,
            englishLevel: englishLevelState,
            communicationTool: communicationToolState,
            introduction: introductionState,
            skypeId: skypeIdState,
            phoneNumber: phoneNumberState,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(
                createOrUpdateProfile(
                  values,
                  history,
                  profileUser ? true : false
                )
              )
              history.push('/dashboard')
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            isValidating,
            setFieldValue,
            dirty,
            isValid,
          }) => (
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    src={imageAvatarState}
                    style={{ width: '4em', height: '4em' }}
                    alt="avatar-image"
                  />
                </Grid>
                <Grid item>
                  <p>
                    Đổi ảnh profile
                    <br />
                    Tối đa 2MB
                  </p>
                </Grid>
                <Grid item style={{ marginBottom: '2em' }}>
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{ color: 'white', fontWeight: '500' }}
                  >
                    Tải file ảnh
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={async (event) => {
                        const file = event.currentTarget.files[0]
                        const formData = new FormData()
                        formData.append('imageAvatar', file)
                        setUploading(true)
                        try {
                          const config = {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          }

                          const { data } = await axios.post(
                            '/api/upload',
                            formData,
                            config
                          )
                          setImageAvatarState(data)
                          setFieldValue('imageAvatar', data)
                          setUploading(false)
                        } catch (error) {
                          console.error(error)
                          setUploading(false)
                        }
                      }}
                    />
                  </Button>
                  {uploading && <LinearProgress color="secondary" />}
                </Grid>

                <Grid item className={classes.formControl}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoComplete="off"
                      id="date-picker-dialog"
                      label="Ngày tháng năm sinh"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      clearable
                      value={values.dateOfBirth}
                      onChange={(value) => setFieldValue('dateOfBirth', value)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item className={classes.formControl}>
                  <FormGroup>
                    <Field
                      autoComplete="off"
                      name="gender"
                      select
                      label="Giới tính"
                      as={TextField}
                    >
                      <MenuItem value="male">Nam</MenuItem>
                      <MenuItem value="female">Nữ</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>
                <Grid item className={classes.formControl}>
                  <FormGroup>
                    <Field
                      autoComplete="off"
                      name="address"
                      as={TextField}
                      label="Địa chỉ"
                    />
                    <ErrorMessage name="address" />
                  </FormGroup>
                </Grid>
                <Grid item className={classes.formControl}>
                  <FormGroup>
                    <Field
                      autoComplete="off"
                      name="englishLevel"
                      select
                      label="Trình độ tiếng Anh"
                      as={TextField}
                    >
                      <MenuItem value="0">Chưa biết</MenuItem>
                      <MenuItem value="1">{`1 / 5`}</MenuItem>
                      <MenuItem value="2">{`2 / 5`}</MenuItem>
                      <MenuItem value="3">{`3 / 5`}</MenuItem>
                      <MenuItem value="4">{`4 / 5`}</MenuItem>
                      <MenuItem value="5">{`5 / 5`}</MenuItem>
                    </Field>
                  </FormGroup>
                </Grid>

                <Grid item className={classes.formControl}>
                  <FormGroup>
                    <Field
                      autoComplete="off"
                      name="skypeId"
                      as={TextField}
                      label="Skype ID"
                      error={errors.skypeId}
                    />
                    <ErrorMessage name="skypeId">
                      {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Grid>

                <Grid item className={classes.formControl}>
                  <FormGroup>
                    <Field
                      autoComplete="off"
                      name="phoneNumber"
                      as={TextField}
                      label="Số điện thoại"
                      type="text"
                      error={errors.phoneNumber}
                    />
                    <ErrorMessage name="phoneNumber">
                      {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>
                </Grid>

                <Grid item className={classes.formControl}>
                  <FormGroup>
                    <Field
                      autoComplete="off"
                      name="introduction"
                      as={TextField}
                      label="Thông tin thêm"
                      multiline
                      rows={4}
                    />
                    <ErrorMessage name="introduction" />
                  </FormGroup>
                </Grid>
                <Grid
                  item
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      component={Link}
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{
                        color: 'white',
                        fontWeight: 600,
                        marginLeft: '0.5em',
                      }}
                      to="/dashboard"
                    >
                      Quay lại
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      style={{ color: 'white', fontWeight: 600 }}
                    >
                      Lưu lại
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default ProfileFormScreen
