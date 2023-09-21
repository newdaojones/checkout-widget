import { gql } from "@apollo/client";

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
      feeMethod
      tip
      tipType
      streetAddress
      streetAddress2
      city
      state
      postalCode
      country
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CHECKOUT_WITHOUT_USER = gql`
  mutation CreateCheckoutWithoutUser($data: CheckoutInputType!) {
    createCheckoutWithoutUser(data: $data) {
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
      feeMethod
      tip
      tipType
      streetAddress
      streetAddress2
      city
      state
      postalCode
      country
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation CreateUser($data: UserInputType!) {
    createUser(data: $data) {
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      dob
      ssn
      streetAddress
      streetAddress2
      city
      state
      postalCode
      country
      isVerified
      createdAt
      updatedAt
      token
    }
  }
`;

export const GET_CHECKOUT = gql`
  query Checkout($id: String!) {
    checkout(id: $id) {
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
      feeMethod
      tip
      tipType
      streetAddress
      streetAddress2
      city
      state
      postalCode
      country
      createdAt
      updatedAt
      transaction {
        checkoutId
        step
        status
        paidStatus
        message
        transactionId
        date
      }
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
      fee
      feeType
      feeMethod
      checkout {
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
        feeMethod
        tip
        tipType
        streetAddress
        streetAddress2
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        transaction {
          checkoutId
          step
          status
          paidStatus
          message
          transactionId
          date
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      phoneNumber
      gender
      dob
      ssn
      streetAddress
      streetAddress2
      city
      state
      postalCode
      country
      isVerified
      createdAt
      updatedAt
    }
  }
`;

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

export const ACCOUNT_VERIFY = gql`
  subscription UserVerify($userId: String!) {
    userVerify(userId: $userId) {
      userId
      status
      error
      token
    }
  }
`;

export const GET_AGREEMENT_LINK = gql`
  query agreementLink {
    agreementLink
  }
`;

export const GET_KYC_LINK = gql`
  query kycLink {
    kycLink
  }
`;

export const KYC_COMPLETED = gql`
  mutation keyCompleted {
    keyCompleted
  }
`;
