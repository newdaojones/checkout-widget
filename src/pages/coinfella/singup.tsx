import React from "react";
import web3 from 'web3';
import { useCheckout } from "../../context/checkout";

export const CoinFellaSignup = () => {
  const { checkoutRequest, checkoutInfo } = useCheckout()
  const { values, touched, errors, setFieldValue, setFieldTouched, setFieldError } = checkoutInfo

  const onValidateWalletAddress = () => {
    if (values.walletAddress && !web3.utils.isAddress(values.walletAddress)) {
      setFieldTouched('walletAddress', true, false)
      setFieldError('walletAddress', 'Wallet Address is invalid')
    }
  }

  return <div>
    <h3 className="text-white text-xl">Payment</h3>
    <div className="border-b-2 border-gray-300 mt-4 mb-5"></div>
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">First Name</p>
          <input
            value={values.firstName}
            onBlur={() => setFieldTouched('firstName', true)}
            onChange={(e) => setFieldValue('firstName', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="Sam"
          />
          {touched.firstName && errors.firstName && <div className='text-red-400 text-[12px] text-left'>{errors.firstName}</div>}
        </div>
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">Last Name</p>
          <input
            value={values.lastName}
            onBlur={() => setFieldTouched('lastName', true)}
            onChange={(e) => setFieldValue('lastName', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="Smith"
          />
          {touched.lastName && errors.lastName && <div className='text-red-400 text-[12px] text-left'>{errors.lastName}</div>}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">Email</p>
          <input
            value={values.email}
            type="email"
            onBlur={() => setFieldTouched('email', true)}
            onChange={(e) => setFieldValue('email', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="sam@gmail.com"
          />
          {touched.email && errors.email && <div className='text-red-400 text-[12px] text-left'>{errors.email}</div>}
        </div>
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">Mobile Number</p>
          <input
            value={values.phoneNumber}
            onBlur={() => setFieldTouched('phoneNumber', true)}
            onChange={(e) => setFieldValue('phoneNumber', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="Smith"
          />
          {touched.phoneNumber && errors.phoneNumber && <div className='text-red-400 text-[12px] text-left'>{errors.phoneNumber}</div>}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">Country</p>
          <input
            value={values.country}
            disabled
            onBlur={() => setFieldTouched('country', true)}
            onChange={(e) => setFieldValue('country', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="USA"
          />
          {touched.country && errors.country && <div className='text-red-400 text-[12px] text-left'>{errors.country}</div>}
        </div>
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">State</p>
          <input
            value={values.state}
            onBlur={() => setFieldTouched('state', true)}
            onChange={(e) => setFieldValue('state', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="CA"
          />
          {touched.state && errors.state && <div className='text-red-400 text-[12px] text-left'>{errors.state}</div>}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">Postal Code</p>
          <input
            value={values.postalCode}
            onBlur={() => setFieldTouched('postalCode', true)}
            onChange={(e) => setFieldValue('postalCode', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="10001"
          />
          {touched.postalCode && errors.postalCode && <div className='text-red-400 text-[12px] text-left'>{errors.postalCode}</div>}
        </div>
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">City</p>
          <input
            value={values.city}
            onBlur={() => setFieldTouched('city', true)}
            onChange={(e) => setFieldValue('city', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="New York"
          />
          {touched.city && errors.city && <div className='text-red-400 text-[12px] text-left'>{errors.city}</div>}
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <p className="text-gray-200 text-md text-left mb-2">Address</p>
          <input
            value={values.streetAddress}
            onBlur={() => setFieldTouched('streetAddress', true)}
            onChange={(e) => setFieldValue('streetAddress', e.target.value)}
            className="outline-none border-2 border-gray-300 rounded-md h-11 w-full flex items-center justify-center text-white text-lg shadow-sm bg-transparent p-2 placeholder-gray-300"
            placeholder="260 King Street"
          />
          {touched.streetAddress && errors.streetAddress && <div className='text-red-400 text-[12px] text-left'>{errors.streetAddress}</div>}
        </div>
      </div>
    </div>
  </div>
}