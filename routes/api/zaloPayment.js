const express = require('express')
const router = express.Router()
const {
  createOrder,
  handleIPNCallback,
  testRoute,
  syncSuccessfulOrder,
} = require('../../controllers/zaloPaymentController')
const { userAuth } = require('../../utils/authPassport')

router.post('/createOrder', userAuth, createOrder)

router.post('/ipn', handleIPNCallback)

router.post('/testRoute', userAuth, testRoute)

router.get(
  '/sync-successful-order/:app_trans_id',
  userAuth,
  syncSuccessfulOrder
)

module.exports = router
