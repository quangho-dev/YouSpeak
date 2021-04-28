import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

const AlertMessage = () => {
  const alerts = useSelector((state) => state.alert)

  return (
    <>
      {alerts.map((alert) => (
        <Alert severity={alert.severity} key={alert.id}>
          {alert.msg}
        </Alert>
      ))}
    </>
  )
}

export default AlertMessage
