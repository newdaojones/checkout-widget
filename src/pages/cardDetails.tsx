import { FormikProps } from 'formik';
import { CardNumber, Cvv, ExpiryDate, Frames } from 'frames-react';
import { useEffect, useMemo, useRef, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import ClockLoader from 'react-spinners/ClockLoader';
import web3 from 'web3';
import { stateList } from "../constants/state";
import { CheckoutInfo } from "../types/checkout.type";
import { checkoutConfig } from "../utils/checkout";
interface Props extends FormikProps<CheckoutInfo> {
  checkoutRequest?: any;
}

export const CardDetails = ({ setFieldTouched, values, errors, touched, setFieldValue, setFieldError, submitForm, checkoutRequest }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onCardValidationChanged = (e: any) => {
    setFieldTouched('isValidCard', true, false)
    setFieldValue('isValidCard', e.isValid)
  }

  const onChangeCardBin = (e: any) => {
    setFieldTouched('cardBin', true, false)
    setFieldValue('cardBin', e.bin)
  }

  const onPaymentMethodChanged = (e: any) => {
    console.log(e.paymentMethod)
    setFieldTouched('cardBrand', true, false)
    setFieldValue('cardBrand', e.paymentMethod)
  }

  const ref = useRef<any>()

  const onValidateWalletAddress = () => {
    if (values.walletAddress && !web3.utils.isAddress(values.walletAddress)) {
      setFieldTouched('walletAddress', true, false)
      setFieldError('walletAddress', 'Wallet Address is invalid')
    }
  }

  const onGenerateTokenFailed = (e: any) => {
    Frames.init(checkoutConfig)
    setFieldValue('isValidCard', false)
    setFieldValue('token', '')
    setIsLoading(false)
  }

  const onGenerate = (e: any) => {
    console.log(e)
    setFieldValue('token', e.token);
  }

  useEffect(() => {
    if (values.isValidCard && values.token && isLoading) {
      submitForm()
      setIsLoading(false)
    }
  }, [values, submitForm, isLoading])

  const isValid = useMemo(() =>
    !errors.walletAddress &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.email &&
    !errors.country &&
    !errors.phoneNumber &&
    !errors.postalCode &&
    !errors.state &&
    !errors.city &&
    !errors.streetAddress &&
    !errors.streetAddress2 &&
    !errors.cardBin &&
    !errors.cardBrand &&
    !errors.isValidCard, [errors])

  const onSubmit = () => {
    if (!isValid || isLoading) {
      return
    }

    if (values.walletAddress && !web3.utils.isAddress(values.walletAddress)) {
      setFieldTouched('walletAddress', true, false)
      setFieldError('walletAddress', 'Wallet address is invalid')
      return
    }

    Frames.submitCard()
    setIsLoading(true)
  }

  return (
    <div className='widget-container flex flex-col'>
      <h3 className="text-white text-4xl mb-10 text-center">Card Details</h3>
      <div>
        <input
          value={values.walletAddress}
          autoComplete="off"
          disabled={!!checkoutRequest?.walletAddress}
          name={checkoutRequest?.walletAddress ? 'walletAddress_off' : 'walletAddress'}
          onChange={(e) => setFieldValue('walletAddress', e.target.value)}
          onBlur={onValidateWalletAddress}
          className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Wallet Address"
        />
        {touched.walletAddress && errors.walletAddress && <div className='text-red-400 text-[12px] text-left'>{errors.walletAddress}</div>}
        <div
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-1">
            <input
              value={values.firstName}
              onBlur={() => setFieldTouched('firstName', true)}
              onChange={(e) => setFieldValue('firstName', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="First Name" />
          </div>
          <div className="flex-1">
            <input
              value={values.lastName}
              onBlur={() => setFieldTouched('lastName', true)}
              onChange={(e) => setFieldValue('lastName', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Last Name" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {touched.firstName && errors.firstName && <div className='text-red-400 text-[12px] text-left'>{errors.firstName}</div>}
          </div>
          <div className="flex-1">
            {touched.lastName && errors.lastName && <div className='text-red-400 text-[12px] text-left'>{errors.lastName}</div>}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {touched.dob && !values.dob && <div className='text-red-400 text-[12px] text-left'>Date of Birth is required</div>}
          </div>
          <div className="flex-1">
            {touched.gender && errors.gender && <div className='text-red-400 text-[12px] text-left'>{errors.gender}</div>}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center mt-3">
        <input
          value={values.email}
          disabled={!!checkoutRequest?.email}
          onBlur={() => setFieldTouched('email', true)}
          onChange={(e) => setFieldValue('email', e.target.value)}
          autoComplete="off"
          name={checkoutRequest?.email ? 'email_off' : 'email'}
          className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Email"
        />
        {touched.email && errors.email && <div className='text-red-400 text-[12px] text-left'>{errors.email}</div>}
        <div className="flex mt-3 text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
          <PhoneInput
            defaultCountry="US"
            placeholder="Phone"
            autoComplete="off"
            name={checkoutRequest?.phoneNumber ? 'phoneNumber_off' : 'phoneNumber'}
            disabled={!!checkoutRequest?.phoneNumber}
            onBlur={() => setFieldTouched('phoneNumber', true)}
            value={values.phoneNumber}
            onChange={(e) => setFieldValue('phoneNumber', e)}
          />
        </div>
        {touched.phoneNumber && errors.phoneNumber && <div className='text-red-400 text-[12px] text-left'>{errors.phoneNumber}</div>}
      </div>
      <div>
        <Frames
          ref={ref}
          config={checkoutConfig}
          cardTokenized={onGenerate}
          paymentMethodChanged={onPaymentMethodChanged}
          cardValidationChanged={onCardValidationChanged}
          cardTokenizationFailed={onGenerateTokenFailed}
          cardBinChanged={onChangeCardBin}
        >
          <div className="flex mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
            <CardNumber />
          </div>
          <div className="flex mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
            <ExpiryDate />
            <Cvv
              onBlur={() => setFieldTouched('cvv', true)}
              onChange={(e) => setFieldValue('cvv', e)} />
          </div>
        </Frames>
        {touched.cardBrand && errors.cardBrand ? <div className='text-red-400 text-[12px] text-left'>{errors.cardBrand}</div>
          : touched.cardBin && errors.cardBin ? <div className='text-red-400 text-[12px] text-left'>{errors.cardBin}</div>
            : touched.isValidCard && errors.isValidCard && <div className='text-red-400 text-[12px] text-left'>{errors.isValidCard}</div>}
        <div className="mt-5 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-1">
            <input
              value={values.country}
              disabled
              onBlur={() => setFieldTouched('country', true)}
              onChange={(e) => setFieldValue('country', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Country" />
          </div>
          <div className="flex-1">
            <input
              value={values.postalCode}
              onBlur={() => setFieldTouched('postalCode', true)}
              onChange={(e) => setFieldValue('postalCode', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Postal Code" />
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            {touched.country && errors.country && <div className='text-red-400 text-[12px] text-left'>{errors.country}</div>}
          </div>
          <div className="flex-1">
            {touched.postalCode && errors.postalCode && <div className='text-red-400 text-[12px] text-left'>{errors.postalCode}</div>}
          </div>
        </div>
        <div
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-1">
            <select
              value={values.state}
              onBlur={() => setFieldTouched('state', true)}
              onChange={(e) => setFieldValue('state', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="State"
            >
              <option className='text-black' value="">State</option>
              {stateList.map((state) => <option className='text-black' key={state.value} value={state.value}>{state.value}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <input
              value={values.city}
              onBlur={() => setFieldTouched('city', true)}
              onChange={(e) => setFieldValue('city', e.target.value)}
              // onChange={(e) => {
              //   let cityName = e.target.value;
              //   cityName = cityName.replace(/[^a-zA-Z]/g, '');
              //   cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
              //   setFieldValue('city', cityName);
              // }}
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
              onBlur={() => setFieldTouched('streetAddress', true)}
              onChange={(e) => setFieldValue('streetAddress', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Address 1" />
          </div>
          <div className="flex-1">
            <input
              value={values.streetAddress2}
              onBlur={() => setFieldTouched('streetAddress2', true)}
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
        onClick={() => onSubmit()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid && !isLoading ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
      >
        <div className="flex items-center">
          {isLoading && <ClockLoader size={20} color='white' className="mr-2" />}
          Submit Payment
        </div>
      </button>
    </div>
  )
}