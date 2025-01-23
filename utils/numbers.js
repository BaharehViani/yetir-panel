export const formatPrice = (price, withoutUnit = false) => {
  return new Intl.NumberFormat("fa-IR").format(price)
    .replace(/(\s|ریال)/gi, '') + (withoutUnit ? '' : ' تومان')
}
