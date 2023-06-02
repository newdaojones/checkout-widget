export const checkoutConfig = {
  debug: true,
  publicKey: process.env.REACT_APP_CHECKOUT_PUBLIC_KEY as string,
  style: {
    base: {
      fontSize: '18px',
      color: 'white',
    },
    invalid: {
      color: 'red'
    }
  }
}