import React from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import Paypal from './PaymentMethods/Paypal'

const ChoosePaymentMethod = (props) => {
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

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
    </Grid>
  )
}

export default ChoosePaymentMethod
