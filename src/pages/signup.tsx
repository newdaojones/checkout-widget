import { FormikProps } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { CheckoutInfo } from "../types/checkout.type";
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import { stateList } from "../constants/state";
import { useQuery } from "@apollo/client";
import { GET_AGREEMENT_LINK } from "../utils/graphql";
import { useAgreement } from "../context/agreement";

interface Props extends FormikProps<CheckoutInfo> {
  onNext: () => void
  checkoutRequestId?: string
}

export const SignUp = ({ checkoutRequestId, touched, errors, values, setFieldTouched, setFieldValue, onNext }: Props) => {
  const { signedAgreementId, openAgreement } = useAgreement()
  const [isGetAgreementLink, setIsGetAgreementLink] = useState(false)
  const { data: agreementLinkRes } = useQuery(GET_AGREEMENT_LINK, {
    skip: !isGetAgreementLink
  })
  const agreementLink = useMemo(() => agreementLinkRes?.agreementLink, [agreementLinkRes])
  const isValid = useMemo(() =>
    !errors.firstName &&
    !errors.lastName &&
    !errors.dob &&
    !errors.userEmail &&
    !errors.userPhoneNumber &&
    !errors.ssn &&
    !errors.password &&
    !errors.streetAddress &&
    !errors.city &&
    !errors.state &&
    !errors.postalCode &&
    values.firstName &&
    values.lastName &&
    values.dob &&
    values.userEmail &&
    values.userPhoneNumber &&
    values.ssn &&
    values.password &&
    values.streetAddress &&
    values.city &&
    values.state &&
    values.postalCode &&
    values.signedAgreementId
    , [values, errors])

  const onGetAgreementLink = () => {
    if (signedAgreementId) {
      return
    }

    if (agreementLink) {
      openAgreement(agreementLink)
    } else {
      setIsGetAgreementLink(true)
    }
  }

  useEffect(() => {
    setFieldValue('signedAgreementId', signedAgreementId)
  }, [signedAgreementId, setFieldValue])

  useEffect(() => {
    if (agreementLink && !signedAgreementId) {
      openAgreement(agreementLink)
    }
  }, [agreementLink])

  return <div className='widget-container flex flex-col'>
    <h3 className="text-white text-4xl mb-10 text-center">Sign Up</h3>
    <div className="flex-1 flex flex-col items-center justify-center">
      <div>
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
        <div
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm flex">
          <div className="flex-1">
            <DatePicker
              className="bg-transparent placeholder-white text-lg outline-none w-full"
              selected={values.dob}
              showMonthDropdown={true}
              showYearDropdown={true}
              placeholderText="Date of Birth"
              openToDate={new Date("1993/09/28")}
              onBlur={() => setFieldTouched('dob', true)}
              onChange={(date) => setFieldValue('dob', date)}
            />
          </div>
          <div className="flex-1">
            <select
              value={values.gender}
              defaultValue="male"
              onBlur={() => setFieldTouched('gender', true)}
              onChange={(e) => setFieldValue('gender', e.target.value)}
              className="bg-transparent placeholder-white text-lg outline-none w-full" placeholder="Last Name">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
      <div className="flex-1 flex flex-col justify-center mt-3 w-full">
        <input
          value={values.ssn}
          onBlur={() => setFieldTouched('ssn', true)}
          onChange={(e) => setFieldValue('ssn', e.target.value)}
          className="mt-3 text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="SSN"
        />
        {touched.ssn && errors.ssn && <div className='text-red-400 text-[12px] text-left'>{errors.ssn}</div>}
        <div className="flex mt-3 text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white">
          <PhoneInput
            defaultCountry="US"
            placeholder="Phone"
            disabled={!!checkoutRequestId}
            onBlur={() => setFieldTouched('userPhoneNumber', true)}
            value={values.userPhoneNumber}
            onChange={(e) => setFieldValue('userPhoneNumber', e)}
          />
        </div>
        {touched.userPhoneNumber && errors.userPhoneNumber && <div className='text-red-400 text-[12px] text-left'>{errors.userPhoneNumber}</div>}
        <input
          value={values.userEmail}
          onBlur={() => setFieldTouched('userEmail', true)}
          onChange={(e) => setFieldValue('userEmail', e.target.value)}
          className="text-white mt-3 text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Email"
        />
        {touched.userEmail && errors.userEmail && <div className='text-red-400 text-[12px] text-left'>{errors.userEmail}</div>}
        <input
          value={values.password}
          onBlur={() => setFieldTouched('password', true)}
          onChange={(e) => setFieldValue('password', e.target.value)}
          className="text-white mt-3 text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
          placeholder="Password"
          type="password"
        />
        {touched.password && !values.password && <div className='text-red-400 text-[12px] text-left'>Password is required</div>}
      </div>
      <div>
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
              <option value="">State</option>
              {stateList.map((state) => <option key={state.value} value={state.value} >{state.label}</option>)}
            </select>
          </div>
          <div className="flex-1">
            <input
              value={values.city}
              onBlur={() => setFieldTouched('city', true)}
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
      <label className="text-white text-xs mt-5 cursor-pointer select-none">
        <input className="checkbox" type="checkbox" checked={!!values.signedAgreementId} onClick={() => onGetAgreementLink()} />
        Click here to review and accept <span className="text-pink-500">Bridge terms of service (TOS)</span>.
      </label>
      {touched.isConfirmedPurchase && errors.isConfirmedPurchase && <div className='text-red-400 text-[12px] text-left'>{errors.isConfirmedPurchase}</div>}

      <div className="text-white mt-5">
        Have an account? <span className="cursor-pointer text-purple-600" onClick={() => setFieldValue('auth', 'login')}>Login</span>
      </div>
    </div>

    <button
      onClick={() => isValid && onNext()}
      className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
    >
      <div className="flex items-center">
        Create Your Account
      </div>
    </button>
  </div>
}