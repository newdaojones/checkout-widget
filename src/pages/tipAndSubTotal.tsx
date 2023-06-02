import React, { useMemo, useState } from "react";
import { FormikProps } from "formik";
import UsFlagImage from '../assets/images/us-flag.png'
import { CheckoutInfo } from "../types/checkout.type";

interface Props extends FormikProps<CheckoutInfo> {
  onNext: () => void
  checkoutRequestId?: string
}

export const TipAndSubTotal = ({ values, onNext, setFieldValue, errors, touched, setFieldTouched, checkoutRequestId }: Props) => {
  const [focusedCustomTip, setFocusedCustomTip] = useState(false)
  const isValid = useMemo(() => values.cost && !errors.cost && !errors.tipPercent, [errors, values])

  return <div className='widget-container'>
    <h3 className="text-white text-4xl mb-10 text-center">Tip & Sub Total</h3>
    <p className="text-white text-lg text-left">Cost of Goods</p>
    <div className="flex w-full">
      <input
        value={values.cost}
        placeholder={'0.00'}
        autoComplete="off"
        disabled={!!checkoutRequestId}
        onBlur={() => setFieldTouched('cost', true)}
        onChange={(e) => setFieldValue && setFieldValue('cost', e.target.value)}
        className="border-white outline-none border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white"
      />
      <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
        <img src={UsFlagImage} alt='' className="flag mr-2" />
        USD
      </div>
    </div>
    {touched.cost && errors.cost && <div className='text-red-400 text-[12px] text-left'>{errors.cost}</div>}
    <div>
      <p className="text-white text-lg mt-4 text-left">+ Tip (optional)</p>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost ? (Number(values.cost) * 0.1).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipPercent === '10' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => setFieldValue && setFieldValue('tipPercent', values.tipPercent === '10' ? '' : '10')}
        >
          10%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost ? (Number(values.cost) * 0.15).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipPercent === '15' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => setFieldValue && setFieldValue('tipPercent', values.tipPercent === '15' ? '' : '15')}
        >
          15%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost ? (Number(values.cost) * 0.2).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipPercent === '20' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => setFieldValue && setFieldValue('tipPercent', values.tipPercent === '20' ? '' : '20')}
        >
          20%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost && values.tipPercent && ![10, 15, 20].includes(Number(values.tipPercent)) ? (Number(values.cost) * Number(values.tipPercent) / 100).toFixed(2) : ''}</p>
        {focusedCustomTip ?
          <input
            value={[10, 15, 20].includes(Number(values.tipPercent)) ? undefined : values.tipPercent}
            placeholder=""
            autoFocus
            onBlur={() => setFocusedCustomTip(false)}
            onChange={(e) => setFieldValue && setFieldValue('tipPercent', e.target.value)}
            className={`h-11 bg-white/50 text-center outline-none text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white placeholder-white ${values.tipPercent && !['10', '15', '20'].includes(values.tipPercent) ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          />
          : <div
            className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipPercent && !['10', '15', '20'].includes(values.tipPercent) ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
            onClick={() => setFocusedCustomTip(true)}
          >
            {values.tipPercent && !['10', '15', '20'].includes(values.tipPercent) ? `${values.tipPercent}%` : '?%'}
          </div>
        }
      </div>
      {touched.tipPercent && errors.tipPercent && <div className='text-red-400 text-[12px] text-right mt-1'>{errors.tipPercent}</div>}
    </div>
    <p className="mt-2 text-white text-lg text-left">= Sub-Total</p>
    <div className="flex w-full">
      <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
        {values.cost ? (Number(values.cost) + Number(values.cost) * Number(values.tipPercent || 0) / 100).toFixed(2) : ''}
      </div>
      <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
        <img src={UsFlagImage} alt='' className="flag mr-2" />
        USD
      </div>
    </div>
    <button
      onClick={() => isValid && onNext()}
      className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
    >
      Get Total
    </button>
  </div>;

}