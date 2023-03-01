import React from "react";
import UsdcIcon from '../assets/images/usdc-icon.png'
import VisaIcon from '../assets/images/visa-icon.png'
import UsFlagImage from '../assets/images/us-flag.png'
import { CheckoutInfo } from "../types/checkout.type";
import { useFormik } from "formik";
import { paymentMethodSchema } from "../constants/validations";

export const MethodAndTotal = ({ checkoutInfo, onNext }: {
  checkoutInfo: CheckoutInfo,
  onNext: (data: Partial<CheckoutInfo>) => void
}) => {
  const onSubmit = (data: Partial<CheckoutInfo>) => {
    onNext(data)
  }
  const { touched, errors, values, setFieldValue, isValid, submitForm } = useFormik<Partial<CheckoutInfo>>({
    initialValues: {
      paymentMethod: checkoutInfo.paymentMethod,
      isConfirmedPurchase: checkoutInfo.isConfirmedPurchase
    },
    validationSchema: paymentMethodSchema,
    onSubmit,
  })

  return (
    <div className='widget-container flex flex-col'>
      <h3 className="text-white text-4xl mb-10 text-center">Method & Total</h3>
      <p className="text-white text-lg text-left">Goods + Tip</p>
      <div className="flex w-full">
        <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
          {checkoutInfo.cost ? (Number(checkoutInfo.cost) + Number(checkoutInfo.cost) * Number(checkoutInfo.tipPercent || 0) / 100).toFixed(2) : ''}
        </div>
        <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
          <img src={UsFlagImage} alt='' className="flag mr-2" />
          USD
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-white text-lg text-left mb-2">+ Payment Fee</p>
        <div className="flex items-center justify-around">
          <button
            onClick={() => setFieldValue('paymentMethod', 'card')}
            className={`h-11 bg-white/50 text-white flex items-center justify-center w-20 rounded-md cursor-pointer shadow-md shadow-white ${values.paymentMethod === 'card' ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
          >
            <img src={VisaIcon} alt='' className="!w-8" />
          </button>
          <p className="text-white text-lg">OR</p>
          <button
            disabled
            className={`h-11 bg-white/50 text-white flex items-center justify-center w-20 rounded-md cursor-pointer shadow-md shadow-white ${values.paymentMethod === 'usdc' ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
            onClick={() => setFieldValue('paymentMethod', 'usdc')}
          >
            <img src={UsdcIcon} alt='' className="!w-6" />
          </button>
        </div>
        {touched.paymentMethod && errors.paymentMethod && <div className='text-red-400 text-[12px] text-left mt-3 ml-6'>{errors.paymentMethod}</div>}
      </div>
      <p className="mt-2 text-white text-lg text-left">= Total</p>
      <div className="flex w-full">
        <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
          {checkoutInfo.cost ? (Number(checkoutInfo.cost) + Number(checkoutInfo.cost) * Number(checkoutInfo.tipPercent || 0) / 100).toFixed(2) : ''}
        </div>
        <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
          <img src={UsFlagImage} alt='' className="flag mr-2" />
          USD
        </div>
      </div>
      <div className="mt-6 mb-2 text-left">
        <label className="text-white text-xs cursor-pointer select-none">
          <input className="checkbox" type="checkbox" checked={values.isConfirmedPurchase} onChange={(e) => setFieldValue('isConfirmedPurchase', e.target.checked)} />
          By checking this box you acknowledge your intent to make a purchase using the <span className="text-pink-500">Visa</span> | <span className="text-pink-500">Mastercard</span> checkout method provided by <span className="text-blue-400">Storefront</span>
        </label>
        {touched.isConfirmedPurchase && errors.isConfirmedPurchase && <div className='text-red-400 text-[12px] text-left'>{errors.isConfirmedPurchase}</div>}
      </div>
      <button
        disabled={!isValid}
        onClick={() => submitForm()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
      >
        Card Details
      </button>
    </div>)
}