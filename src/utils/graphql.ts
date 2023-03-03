import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($data: CheckoutInputType!) {
    createCheckout(data: $data) {
      id
      firstName
      lastName
      email
      phoneNumber
      currency
      amount
      fee
      tip
      tipType
      streetAddress
      streetAddress2
      city
      state
      zip
      country
      checkoutChargeId
      checkoutStatus
      checkoutPaidAt
      primeTrustId
      primeTrustStatus
      primeTrustPaidAt
      createdAt
      updatedAt
    }
  }
`;