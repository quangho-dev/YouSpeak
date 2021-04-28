import React from 'react'
import queryString from 'query-string'
import { Grid, Typography } from '@material-ui/core'

const VnpayReturn = (props) => {
  let params = queryString.parse(props.location.search)
  console.log('params:', params)

  return (
    <Grid className="container" container justify="center">
      <Grid item>
        <Typography variant="h4">
          {params.code === '00'
            ? 'Bạn đã thanh toán thành công!'
            : 'Xin lỗi, đã xảy ra lỗi trong quá trình thanh toán.'}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default VnpayReturn
