import * as yup from 'yup';

export const cardDetailsScheme = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phoneNumber: yup.string().required('Phone Number is required'),
  tokenId: yup.string().required('The card info is invalid'),
  country: yup.string().optional(),
  zip: yup.string().required('Zip Code is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  streetAddress: yup.string().required('Street Address is required'),
  streetAddress2: yup.string().optional(),
})