import React from "react";
import { CheckoutInfo } from "../types/checkout.type";
const CreditCardInput = require('react-credit-card-input');

export const CardDetails = ({ checkoutInfo, onChange, onNext }: {
  checkoutInfo: CheckoutInfo,
  onChange: (key: string, value: any) => void
  onNext: () => void
}) => {
  const isDisabled = !checkoutInfo.firstName
    || !checkoutInfo.lastName
    || !checkoutInfo.email
    || !checkoutInfo.phoneNumber
    || !checkoutInfo.cardNumber
    || !checkoutInfo.expiry
    || !checkoutInfo.cvc
    || !checkoutInfo.addressLine1
    || !checkoutInfo.city
    || !checkoutInfo.state
    || !checkoutInfo.zip
    || !checkoutInfo.country

  return (<div className='widget-container flex flex-col'>
    <h3 className="text-white text-4xl mb-10 text-center">Card Details</h3>
    <div>
      <input
        value={checkoutInfo.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
        className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
        placeholder="First Name"
      />
      <input
        value={checkoutInfo.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
        className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
        placeholder="Last Name"
      />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      <input
        value={checkoutInfo.email}
        onChange={(e) => onChange('email', e.target.value)}
        className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
        placeholder="Email"
      />
      <input
        value={checkoutInfo.phoneNumber}
        onChange={(e) => onChange('phoneNumber', e.target.value)}
        className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
        placeholder="Phone"
      />
    </div>
    <div>
      <CreditCardInput
        cardNumberInputProps={{
          value: checkoutInfo.cardNumber,
          onChange: (e: any) => onChange('cardNumber', e.target.value),
          onError: () => onChange('cardNumber', '')
        }}
        cardExpiryInputProps={{
          value: checkoutInfo.expiry,
          onChange: (e: any) => onChange('expiry', e.target.value),
          onError: () => onChange('expiry', '')
        }}
        cardCVCInputProps={{
          value: checkoutInfo.cvc,
          onChange: (e: any) => onChange('cvc', e.target.value),
          onError: () => onChange('cvc', '')
        }}
      
        fieldStyle={{
          background: 'rgba(255,255,255,0.2)',
          borderBottom: 2,
          borderLeft: 2,
          borderStyle: 'solid',
          borderColor: 'white',
          height: '1.95rem'
        }}
        cardImageStyle={{
          width: 'inherit !important',
        }}
        inputStyle={{
          background: 'transparent',
          color: 'white',
        }}
      />
      <div className="mt-3 mb-4 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
        <div className="flex-1">
          <input
            value={checkoutInfo.country}
            onChange={(e) => onChange('country', e.target.value)}
            className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Country" />
        </div>
        <div className="flex-1">
          <input
            value={checkoutInfo.zip}
            onChange={(e) => onChange('zip', e.target.value)}
            className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Zip" />
        </div>
      </div>
      <div
        className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
        <div className="flex-1">
          <input
            value={checkoutInfo.state}
            onChange={(e) => onChange('state', e.target.value)}
            className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="State" />
        </div>
        <div className="flex-1">
          <input
            value={checkoutInfo.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="City" />
        </div>
      </div>
      <div className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
        <div className="flex-2">
          <input
            value={checkoutInfo.addressLine1}
            onChange={(e) => onChange('addressLine1', e.target.value)}
            className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Address 1" />
        </div>
        <div className="flex-1">
          <input
            value={checkoutInfo.addressLine2}
            onChange={(e) => onChange('addressLine2', e.target.value)}
            className="bg-transparent placeholder-white text-lg outline-none w-full text-right" placeholder="Unit" />
        </div>
      </div>
    </div>
    <button
      disabled={isDisabled}
      onClick={() => onNext()}
      className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${!isDisabled ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
    >
      Submit Payment
    </button>
  </div>)
}