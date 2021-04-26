// import React from 'react'
// import Snackbar from '@material-ui/core/Snackbar'
// import { useDispatch, useSelector } from 'react-redux'
// import { closeAlert } from '../actions/alert'
// import MuiAlert from '@material-ui/lab/Alert'

// const Alert = (props) => {
//   return <MuiAlert elevation={6} variant="filled" {...props} />
// }

// const Message = () => {
//   const alerts = useSelector((state) => state.alert)
//   const { msg, severity, openAlert } = alerts
//   const dispatch = useDispatch()

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return
//     }
//     dispatch(closeAlert)
//   }

//   return (
//     <Snackbar
//       open={openAlert}
//       // ContentProps={{
//       //   style: {
//       //     backgroundColor: `${colorAlert}`,
//       //   },
//       // }}
//       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       autoHideDuration={6000}
//       onClose={handleClose}
//     >
//       <Alert onClose={handleClose} severity={severity}>
//         {msg}
//       </Alert>
//     </Snackbar>
//   )
// }

// export default Message
