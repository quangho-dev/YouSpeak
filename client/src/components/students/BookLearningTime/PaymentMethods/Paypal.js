import React from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import { useFormikContext } from 'formik'
import convertVNDToUSD from '../../../../utils/convertVNDToUSD'

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })

export default function Paypal() {
  const { values, submitForm } = useFormikContext()

  const priceInUSD = convertVNDToUSD(values.price)

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: priceInUSD.toFixed(2).toString(),
          },
        },
      ],
    })
  }

  const onApprove = (data, actions) => {
    toast.success('Bạn đã thanh toán thành công!')
    submitForm()
    return actions.order.capture()
  }

  return (
    <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  )
}
