import React, { useRef } from "react";
import { CheckoutInfo } from "../types/checkout.type";
import { Frames, CardNumber, ExpiryDate, Cvv } from 'frames-react';
import { Formik, useFormik } from 'formik';
import { cardDetailsSchema } from "../constants/validations";
import PhoneInput from 'react-phone-number-input'

export const CardDetails = ({ checkoutInfo, onNext }: {
  checkoutInfo: CheckoutInfo,
  onNext: (data: Partial<CheckoutInfo>) => void
}) => {
  const onSubmit = (data: Partial<CheckoutInfo>) => {
    onNext(data)
  };

  const { values, setFieldValue, errors, touched, submitForm, isValid } = useFormik<Partial<CheckoutInfo>>({
    initialValues: {
      firstName: checkoutInfo.firstName,
      lastName: checkoutInfo.lastName,
      email: checkoutInfo.email,
      phoneNumber: checkoutInfo.phoneNumber,
      tokenId: checkoutInfo.tokenId,
      streetAddress: checkoutInfo.streetAddress,
      streetAddress2: checkoutInfo.streetAddress2,
      city: checkoutInfo.city,
      state: checkoutInfo.state,
      zip: checkoutInfo.zip,
      country: checkoutInfo.country
    },
    validationSchema: cardDetailsSchema,
    onSubmit
  });
  const onBlueCard = () => {
    setFieldValue('tokenId', '')
    Frames.submitCard()
  }

  const onGeneratedToken = (e: any) => {
    setFieldValue('tokenId', e.token)
  }

  const onErrorCardToken = () => {
    setFieldValue('tokenId', '')
  }

  return (
    <div className='widget-container flex flex-col'>
      <h3 className="text-white text-4xl mb-10 text-center">Card Details</h3>
      <div>
        <input
          value={values.firstName}
          onChange={(e) => setFieldValue('firstName', e.target.value)}
          className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="First Name"
        />
        {touched.firstName && errors.firstName && <div className='text-red-400 text-[12px] text-left'>{errors.firstName}</div>}
        <input
          value={values.lastName}
          onChange={(e) => setFieldValue('lastName', e.target.value)}
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Last Name"
        />
        {touched.lastName && errors.lastName && <div className='text-red-400 text-[12px] text-left'>{errors.lastName}</div>}
      </div>
      <div className="flex-1 flex flex-col justify-center mt-3">
        <input
          value={values.email}
          onChange={(e) => setFieldValue('email', e.target.value)}
          className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Email"
        />
        {touched.email && errors.email && <div className='text-red-400 text-[12px] text-left'>{errors.email}</div>}
        <div className="flex mt-3 text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
          <PhoneInput
            defaultCountry="US"
            placeholder="Phone"
            value={values.phoneNumber}
            onChange={(e) => setFieldValue('phoneNumber', e)}
          />
        </div>
        <input
          value={values.phoneNumber}
          onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Phone"
        />
        {touched.phoneNumber && errors.phoneNumber && <div className='text-red-400 text-[12px] text-left'>{errors.phoneNumber}</div>}
      </div>
      <div>
        <Frames
          config={{
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
          }}
          cardTokenized={onGeneratedToken}
          frameBlur={onBlueCard}
          cardTokenizationFailed={onErrorCardToken}
        >
          <div className="flex mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
            <CardNumber />
          </div>
          <div className="flex mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
            <ExpiryDate />
            <Cvv />
          </div>
        </Frames>
        {touched.tokenId && errors.tokenId && <div className='text-red-400 text-[12px] text-left'>{errors.tokenId}</div>}
        <div className="mt-10 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-1">
            <input
              value={values.country}
              onChange={(e) => setFieldValue('country', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Country" />
          </div>
          <div className="flex-1">
            <input
              value={values.zip}
              onChange={(e) => setFieldValue('zip', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Zip" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {touched.country && errors.country && <div className='text-red-400 text-[12px] text-left'>{errors.country}</div>}
          </div>
          <div className="flex-1">
            {touched.zip && errors.zip && <div className='text-red-400 text-[12px] text-left'>{errors.zip}</div>}
          </div>
        </div>
        <div
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-1">
            <input
              value={values.state}
              onChange={(e) => setFieldValue('state', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="State" />
          </div>
          <div className="flex-1">
            <input
              value={values.city}
              onChange={(e) => setFieldValue('city', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="City" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {touched.state && errors.state && <div className='text-red-400 text-[12px] text-left'>{errors.state}</div>}
          </div>
          <div className="flex-1">
            {touched.city && errors.city && <div className='text-red-400 text-[12px] text-left'>{errors.city}</div>}
          </div>
        </div>
        <div className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-2">
            <input
              value={values.streetAddress}
              onChange={(e) => setFieldValue('streetAddress', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Address 1" />
          </div>
          <div className="flex-1">
            <input
              value={values.streetAddress2}
              onChange={(e) => setFieldValue('streetAddress2', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full text-right" placeholder="Unit" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {touched.streetAddress && errors.streetAddress && <div className='text-red-400 text-[12px] text-left'>{errors.streetAddress}</div>}
          </div>
          <div className="flex-1">
            {touched.streetAddress2 && errors.streetAddress2 && <div className='text-red-400 text-[12px] text-left'>{errors.streetAddress2}</div>}
          </div>
        </div>
      </div>
      <button
        onClick={() => submitForm()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
      >
        Submit Payment
      </button>
    </div>
  )
}