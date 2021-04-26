import express from 'express'
const router = express.Router()
import { v4 as uuidv4 } from 'uuid'
import https from 'https'
import crypto from 'crypto'

router.post('/create_payment_url', function (req, res, next) {
  //parameters send to MoMo get get payUrl
  var endpoint = 'https://test-payment.momo.vn/gw_payment/transactionProcessor'
  var hostname = 'https://test-payment.momo.vn'
  var path = '/gw_payment/transactionProcessor'
  var partnerCode = 'MOMOKOSC20210411'
  var accessKey = 'xBX1EKtGo8gtKix7'
  var serectkey = 'SZipO0476DGi5uYgXMJQuoU5lpv0lJai'
  var orderInfo = 'pay with MoMo'
  var returnUrl = 'https://momo.vn/return'
  var notifyurl = 'https://callback.url/notify'
  var amount = '50000'
  var orderId = uuidv4()
  var requestId = uuidv4()
  var requestType = 'captureMoMoWallet'
  var extraData = 'merchantName=;merchantId=' //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store

  //before sign HMAC SHA256 with format
  //partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
  var rawSignature =
    'partnerCode=' +
    partnerCode +
    '&accessKey=' +
    accessKey +
    '&requestId=' +
    requestId +
    '&amount=' +
    amount +
    '&orderId=' +
    orderId +
    '&orderInfo=' +
    orderInfo +
    '&returnUrl=' +
    returnUrl +
    '&notifyUrl=' +
    notifyurl +
    '&extraData=' +
    extraData
  //puts raw signature
  console.log('--------------------RAW SIGNATURE----------------')
  console.log(rawSignature)
  //signature
  var signature = crypto
    .createHmac('sha256', serectkey)
    .update(rawSignature)
    .digest('hex')
  console.log('--------------------SIGNATURE----------------')
  console.log(signature)

  //json object send to MoMo endpoint
  var body = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    returnUrl: returnUrl,
    notifyUrl: notifyurl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
  })
  //Create the HTTPS objects
  var options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/gw_payment/transactionProcessor',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }

  //Send the request and get the response
  console.log('Sending....')
  var request = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`)
    console.log(`Headers: ${JSON.stringify(res.headers)}`)
    res.setEncoding('utf8')
    res.on('data', (body) => {
      console.log('Body')
      console.log(body)
      console.log('payURL')
      console.log(JSON.parse(body).payUrl)
    })
    res.on('end', () => {
      console.log('No more data in response.')
    })
  })

  request.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  })

  // write data to request body
  request.write(body)
  request.end()
})

export default router
