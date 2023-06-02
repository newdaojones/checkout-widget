import * as yup from 'yup';

export const cardDetailsSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phoneNumber: yup.string().required('Phone Number is required'),
  country: yup.string().optional(),
  zip: yup.string().required('Zip Code is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  streetAddress: yup.string().required('Street Address is required'),
  streetAddress2: yup.string().optional(),
  isValidCard: yup.boolean().isTrue('The card info is invalid')
})

export const tipAndSubTotalSchema = yup.object().shape({
  cost: yup.number().required('The cost is required').positive().min(1, 'The cost must be greater than $1'),
  tipPercent: yup.number().positive('The tip amount must be positive')
})

export const paymentMethodSchema = yup.object().shape({
  paymentMethod: yup.string().required('The payment method is required'),
  isConfirmedPurchase: yup.boolean().isTrue('Please confirm for purchasing')
})

export const checkoutValidationSchema = yup.object().shape({
  walletAddress: yup.string().required('Wallet Address is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phoneNumber: yup.string().required('Phone Number is required'),
  userEmail: yup.string().required('Email is required').email('Email is invalid'),
  userPhoneNumber: yup.string().required('Phone Number is required'),
  country: yup.string().optional(),
  zip: yup.string().required('Zip Code is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  streetAddress: yup.string().required('Street Address is required'),
  streetAddress2: yup.string().optional(),
  isValidCard: yup.boolean().isTrue('The card info is invalid'),
  cost: yup.number().required('The cost is required').positive().min(1, 'The cost must be greater than $1'),
  tipPercent: yup.number().positive('The tip amount must be positive'),
  feeMethod: yup.number().positive('Payment fee method is required'),
  isConfirmedPurchase: yup.boolean().isTrue('Please confirm for purchasing')
})