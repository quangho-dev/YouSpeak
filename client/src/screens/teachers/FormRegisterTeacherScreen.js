import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import RegisterTeacherStep1Screen from './RegisterTeacherStep1Screen'

const FormRegisterTeacherScreen = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    degreeImages: [],
    expImages: [],
  }

  const [step, setStep] = useState(1)

  const validationSchema = Yup.object({
    name: Yup.string().required('Không được để trống'),
    email: Yup.string()
      .email('Email không đúng')
      .required('Không được để trống'),
    password: Yup.string().required('Không được để trống'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Mật khẩu không trùng khớp')
      .required('Không được để trống'),
  })

  // den buoc tiep theo
  const nextStep = () => {
    setStep(step + 1)
  }

  // tro ve buoc truoc
  const prevStep = () => {
    setStep(step - 1)
  }

  // const onSubmit = async (values, { resetForm }) => {
  // // submit process
  // }

  // switch (step) {
  //   case 1:
  //     return (
  //       <RegisterTeacherStep1Screen
  //         formValues={formValues}
  //         setFormValues={setFormValues}
  //       />
  //     )
  //   default:
  //     console.log('This is a multi-step form built with React.')
  // }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // onSubmit={onSubmit} >
    >
      {(formik) => {
        console.log('Formik props', formik)
        // <Form></Form>
        switch (step) {
          case 1:
            return <RegisterTeacherStep1Screen />

          case 2:
            return (
              <div style={{ margin: '5em 0 0 3em' }}>
                <p>Form step 2</p>
                <button style={{ marginRight: '0.5em' }} onClick={nextStep}>
                  Tiếp theo
                </button>
                <button style={{ marginRight: '0.5em' }} onClick={prevStep}>
                  Lùi lại
                </button>
              </div>
            )

          case 3:
            return (
              <div style={{ margin: '5em 0 0 3em' }}>
                <p>Form step 3</p>{' '}
                <button style={{ marginRight: '0.5em' }} onClick={nextStep}>
                  Tiếp theo
                </button>
                <button style={{ marginRight: '0.5em' }} onClick={prevStep}>
                  Lùi lại
                </button>
              </div>
            )
          case 4:
            return (
              <div style={{ margin: '5em 0 0 3em' }}>
                <p>success</p>
                <button style={{ marginRight: '0.5em' }} onClick={nextStep}>
                  Tiếp theo
                </button>
                <button style={{ marginRight: '0.5em' }} onClick={prevStep}>
                  Lùi lại
                </button>
              </div>
            )
          default:
            console.log('This is a multi-step form built with React.')
        }
      }}
    </Formik>
  )
}

export default FormRegisterTeacherScreen
