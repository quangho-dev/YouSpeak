import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import Paypal from './PaymentMethods/Paypal'

const ChoosePaymentMethod = (props) => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Grid item style={{ marginBottom: '1em' }}>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
        >
          Chọn phương thức thanh toán
        </Typography>
      </Grid>

      <Grid item container direction="column" style={{ width: '30%' }}>
        <Grid item>
          <Typography variant="h6">Paypal:</Typography>
        </Grid>
        <Grid item>
          <Paypal />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ChoosePaymentMethod
