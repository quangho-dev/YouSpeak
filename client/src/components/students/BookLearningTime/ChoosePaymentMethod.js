import React from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import Paypal from './PaymentMethods/Paypal'
import MyButton from '../../ui/MyButton'
import { useFormikContext } from 'formik'
import axios from 'axios'
import api from '../../../utils/api'

const ChoosePaymentMethod = (props) => {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  const { values, submitForm } = useFormikContext()

  const handleSubmitZaloPay = async () => {
    const res = await api.post('/zaloPayment/createOrder', values)
    window.location.replace(res.data)
  }
  return (
    <Grid item container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography
          variant={matchesMD ? 'h4' : 'h5'}
          style={{
            textTransform: 'uppercase',
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Chọn phương thức thanh toán
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Typography variant="h6">Paypal:</Typography>
        </Grid>
        <Grid item>
          <Paypal />
        </Grid>
      </Grid>

      <Grid item>
        <MyButton onClick={handleSubmitZaloPay}>ZaloPay</MyButton>
      </Grid>
    </Grid>
  )
}

export default ChoosePaymentMethod
