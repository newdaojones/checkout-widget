import * as yup from 'yup';

export const checkoutValidationSchema = yup.object().shape({
  walletAddress: yup.string().required('Wallet Address is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phoneNumber: yup.string().required('Phone Number is required'),
  userEmail: yup.string().email('Email is invalid'),
  userPhoneNumber: yup.string(),
  country: yup.string().optional(),
  postalCode: yup.string().required('Zip Code is required'),
  ssn: yup.string().matches(/^(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/, 'SSN is invalid'),
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