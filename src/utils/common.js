export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}
export function shippedPrice(ship) {
  if (!ship) return
  const priceShippedList = {
    normal: 20000,
    speed: 30000,
  }
  return priceShippedList[ship]
}

export function checkVoucher(voucher) {
  if (!voucher) return
  const listVoucher = {
    giam10: 10,
    giam20: 20,
    giam30: 30,
  }
  if (!listVoucher[voucher]) return -1
  return listVoucher[voucher]
}
