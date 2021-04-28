import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'

const AlertMessage = () => {
  const alerts = useSelector((state) => state.alert)

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <Alert
        key={alert.id}
        style={{ marginBottom: '1em' }}
        severity={alert.alertType || 'info'}
      >
        {alert.msg}
      </Alert>
    ))
  )
}

export default AlertMessage
