import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($data: CheckoutInputType!) {
    createCheckout(data: $data) {
      id
      walletAddress
      firstName
      lastName
      email
      phoneNumber
      currency
      amount
      fee
      feeType
      tip
      tipType
      streetAddress
      streetAddress2
      city
      state
      zip
      country
      createdAt
      updatedAt
    }
  }
`;

export const GET_CHECKOUT_REQUEST = gql`
  query CheckoutRequest($id: String!) {
    checkoutRequest(id: $id) {
      id
      partnerOrderId
      walletAddress
      email
      phoneNumber
      amount
      status
    }
  }
`

export const TRANSACTION_SUBSCRIPTION = gql`
  subscription Transaction($checkoutId: String!) {
    transaction(checkoutId: $checkoutId) {
      checkoutId
      step
      status
      paidStatus
      message
      transactionId
      date
    }
  }
`;