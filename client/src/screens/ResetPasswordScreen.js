import React from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { resetPassword } from '../actions/resetPassword'

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    padding: '0 4em',
  },
  formControl: {
    marginBottom: '1em',
  },
}))

const ResetPasswordScreen = (props) => {
  const dispatch = useDispatch()

  const token = props.match.params.token

  const classes = useStyles()

  const initialValues = {
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    password: Yup.string().required('Không được để trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Mật khẩu không trùng khớp')
      .required('Không được để trống'),
  })

  const onSubmit = async (values, { setSubmitting }) => {
    const { password } = values
    setTimeout(() => {
      const data = {
        password,
        token,
      }

      setSubmitting(false)
      dispatch(resetPassword(data))
      props.history.push('/login')
    }, 500)
  }

  return (
    <div className={classes.rowContainer}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Sửa lại mật khẩu
          </Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, isValid }) => {
              return (
                <Form>
                  <Field
                    component={TextField}
                    type="password"
                    label="Mật khẩu mới"
                    name="password"
                    fullWidth
                    className={classes.formControl}
                  />

                  <Field
                    component={TextField}
                    type="password"
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    fullWidth
                    className={classes.formControl}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    style={{ color: 'white' }}
                    fullWidth
                    disableRipple
                  >
                    Gửi
                  </Button>
                </Form>
              )
            }}
          </Formik>
        </Grid>
      </Grid>
    </div>
  )
}
export default ResetPasswordScreen
