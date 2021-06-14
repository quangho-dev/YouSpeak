const express = require('express')
const router = express.Router()
const { userAuth } = require('../../utils/authPassport')
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const buildUrl = require('build-url')

router.post('/create-payment-url', async (req, res) => {
  const endpoint =
    'https://test-payment.momo.vn/gw_payment/transactionProcessor'
  const hostname = 'https://test-payment.momo.vn'
  const partnerCode = 'MOMOKOSC20210411'
  const accessKey = 'xBX1EKtGo8gtKix7'
  const serectkey = 'SZipO0476DGi5uYgXMJQuoU5lpv0lJai'
  const orderInfo = 'pay with MoMo'
  const returnUrl = 'http://localhost:3000/momo-payment/success'
  const notifyUrl = 'https://e50625abb2f8.ngrok.io/api/momo-payment/momo_ipn'
  const amount = '50000'
  const orderId = uuidv4()
  const requestId = uuidv4()
  const requestType = 'captureMomoWallet'
  const extraData = ''
  const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}
&requestId=${requestId}&amount=${amount}&orderId=${orderId}
&orderInfo=${orderInfo}&returnUrl=${returnUrl}&notifyUrl=${notifyUrl}
&extraData=${extraData}`

  const signature = crypto
    .createHmac('sha256', serectkey)
    .update(rawSignature)
    .digest('hex')

  const paymentUrl = buildUrl(`${endpoint}`, {
    queryParams: {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
    },
  })
})

// router.post('/create_payment_url', async (req, res) => {
//   const endpoint =
//     'https://test-payment.momo.vn/gw_payment/transactionProcessor'
//   const hostname = 'https://test-payment.momo.vn'
//   const path = '/gw_payment/transactionProcessor'
//   const partnerCode = 'MOMOKOSC20210411'
//   const accessKey = 'xBX1EKtGo8gtKix7'
//   const serectkey = 'SZipO0476DGi5uYgXMJQuoU5lpv0lJai'
//   const orderInfo = 'pay with MoMo'
//   const returnUrl = 'http://localhost:3000/momo-payment/success'
//   const notifyurl = 'http://localhost:5000/api/momo-payment/momo_ipn'
//   const amount = '50000'
//   const orderId = uuidv4()
//   const requestId = uuidv4()
//   const requestType = 'captureMoMoWallet'
//   const extraData = ''

//   var rawSignature =
//     'partnerCode=' +
//     partnerCode +
//     '&accessKey=' +
//     accessKey +
//     '&requestId=' +
//     requestId +
//     '&amount=' +
//     amount +
//     '&orderId=' +
//     orderId +
//     '&orderInfo=' +
//     orderInfo +
//     '&returnUrl=' +
//     returnUrl +
//     '&notifyUrl=' +
//     notifyurl +
//     '&extraData=' +
//     extraData
//   //puts raw signature
//   console.log('--------------------RAW SIGNATURE----------------')
//   console.log(rawSignature)
//   //signature
//   const crypto = require('crypto')
//   var signature = crypto
//     .createHmac('sha256', serectkey)
//     .update(rawSignature)
//     .digest('hex')
//   console.log('--------------------SIGNATURE----------------')
//   console.log(signature)

//   //json object send to MoMo endpoint
//   var body = JSON.stringify({
//     partnerCode: partnerCode,
//     accessKey: accessKey,
//     requestId: requestId,
//     amount: amount,
//     orderId: orderId,
//     orderInfo: orderInfo,
//     returnUrl: returnUrl,
//     notifyUrl: notifyurl,
//     extraData: extraData,
//     requestType: requestType,
//     signature: signature,
//   })
//   //Create the HTTPS objects
//   var options = {
//     hostname: 'test-payment.momo.vn',
//     port: 443,
//     path: '/gw_payment/transactionProcessor',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Content-Length': Buffer.byteLength(body),
//     },
//   }

//   //Send the request and get the response
//   console.log('Sending....')
//   var req = https.request(options, (res) => {
//     console.log(`Status: ${res.statusCode}`)
//     console.log(`Headers: ${JSON.stringify(res.headers)}`)
//     res.setEncoding('utf8')
//     res.on('data', (body) => {
//       console.log('Body')
//       console.log(body)
//       console.log('payURL')
//       console.log(JSON.parse(body).payUrl)
//     })
//     res.on('end', () => {
//       console.log('No more data in response.')
//     })
//   })

//   req.on('error', (e) => {
//     console.log(`problem with request: ${e.message}`)
//   })

//   // write data to request body
//   req.write(body)
//   req.end()
// })

// router.post('/momo_ipn', (req, res) => {
//   console.log('IPN HERE!')
// })

module.exports = router
