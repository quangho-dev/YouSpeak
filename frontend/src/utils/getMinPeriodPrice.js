const getMinPeriodPrice = (periods) => {
  const periodsValuesArray = Object.values(periods)
  const priceArray = periodsValuesArray.map((item) => item.price)
  const filteredUndefinedArray = priceArray.filter(
    (item) => item !== undefined && item !== 0
  )
  return Math.min(...filteredUndefinedArray)
}

export default getMinPeriodPrice
