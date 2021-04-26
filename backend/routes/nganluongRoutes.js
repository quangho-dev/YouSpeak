import express from 'express'
const router = express.Router()
import config from 'config'
import { v4 as uuidv4 } from 'uuid'
import MD5 from 'md5'
import querystring from 'qs'

router.post('/create_payment_url', function (req, res, next) {
  const checkoutUrl = 'https://sandbox.nganluong.vn:8088/nl35/checkout.php'

  const merchant_site_code = config.get('nganluong_merchant_site_code')
  const nganluong_secure_pass = config.get('nganluong_secure_pass')

  const return_url = 'http://localhost:5000/api/nganluong/success'

  const receiver = 'quang.ho1804@gmail.com'
  const transaction_info = 'text'
  const order_code = 'lesson'
  const price = 40000
  const currency = 'vnd'
  const quantity = 1
  const tax = 0
  const discount = 0
  const fee_cal = 0
  const fee_shipping = 0
  const order_description = 'test'
  const buyer_info = 'abc*|*someone@gmail.com*|*0944810181*|*abc'
  const affiliate_code = null
  const lang = 'vi'
  const cancel_url = null
  const notify_url = null
  const time_limit = null

  let nganluong_Params = {}

  nganluong_Params['merchant_site_code'] = merchant_site_code
  nganluong_Params['return_url'] = return_url
  nganluong_Params['receiver'] = receiver
  nganluong_Params['transaction_info'] = transaction_info
  nganluong_Params['order_code'] = order_code
  nganluong_Params['price'] = price
  nganluong_Params['currency'] = currency
  nganluong_Params['tax'] = tax
  nganluong_Params['discount'] = discount
  nganluong_Params['fee_cal'] = fee_cal
  nganluong_Params['fee_shipping'] = fee_shipping
  nganluong_Params['order_description'] = order_description
  nganluong_Params['buyer_info'] = buyer_info
  nganluong_Params['affiliate_code'] = affiliate_code
  nganluong_Params['lang'] = lang
  nganluong_Params['cancel_url'] = cancel_url
  nganluong_Params['notify_url'] = notify_url
  nganluong_Params['time_limit'] = time_limit

  const secure_code = MD5(
    merchant_site_code +
      ' ' +
      return_url +
      ' ' +
      receiver +
      ' ' +
      transaction_info +
      ' ' +
      order_code +
      ' ' +
      price +
      ' ' +
      currency +
      ' ' +
      quantity +
      ' ' +
      tax +
      ' ' +
      discount +
      ' ' +
      fee_cal +
      ' ' +
      fee_shipping +
      ' ' +
      order_description +
      ' ' +
      buyer_info +
      ' ' +
      affiliate_code +
      ' ' +
      nganluong_secure_pass
  )

  nganluong_Params['secure_code'] = secure_code

  const nganluongUrl =
    checkoutUrl +
    '?' +
    querystring.stringify(nganluong_Params, { encode: true })

  res.status(200).json(nganluongUrl)

  console.log('url:', nganluongUrl)
})

export default router
