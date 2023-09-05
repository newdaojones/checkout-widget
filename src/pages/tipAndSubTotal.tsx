import { FormikProps } from "formik";
import { useMemo, useState } from "react";
import UsFlagImage from '../assets/images/us-flag.png';
import { CheckoutInfo } from "../types/checkout.type";
import { calcTip } from "../utils";

interface Props extends FormikProps<CheckoutInfo> {
  onNext: () => void
  checkoutRequestId?: string
}

export const TipAndSubTotal = ({ values, onNext, setFieldValue, errors, touched, setFieldTouched, checkoutRequestId }: Props) => {
  const [focusedCustomTip, setFocusedCustomTip] = useState(false)
  const isValid = useMemo(() => values.cost && !errors.cost && !errors.tipAmount, [errors, values])
  const tipAmount = useMemo(() => calcTip(values), [values]);
  const subTotal = useMemo(() => (Number(values.cost || 0) + tipAmount).toFixed(2), [values, tipAmount])

  const onChangeTip = (value: string, type: 'percent' | 'cash') => {
    if (!setFieldValue) {
      return
    }

    setFieldValue('tipType', type);

    const tipAmount = values.tipAmount === value ? '' : value
    setFieldValue('tipAmount', tipAmount)
  }

  return <div className='widget-container'>
    <h3 className="text-white text-4xl mb-10 text-center">Tip & Sub Total</h3>
    <p className="text-white text-lg text-left">Cost of Goods</p>
    <div className="flex w-full">
      <input
        value={values.cost}
        placeholder={'0.00'}
        autoComplete="off"
        name={checkoutRequestId ? 'cost_off' : 'cost'}
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
      <p className="text-white text-lg mt-4 text-right">(dab up your driver)</p>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost ? (Number(values.cost) * 0.03).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipType === 'percent' && values.tipAmount === '03' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => onChangeTip('03', 'percent')}
        >
          03%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost ? (Number(values.cost) * 0.08).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipType === 'percent' && values.tipAmount === '08' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => onChangeTip('08', 'percent')}
        >
          08%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.cost ? (Number(values.cost) * 0.15).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipType === 'percent' && values.tipAmount === '15' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => onChangeTip('15', 'percent')}
        >
          15%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {values.tipType === 'cash' ? (tipAmount || '') : ''}</p>
        {focusedCustomTip ?
          <div className={`h-11 bg-white/50 text-center flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white placeholder-white ${values.tipType === 'cash' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}>
            <p className="text-white">$</p>
            <input
              value={values.tipType === 'percent' ? undefined : values.tipAmount}
              placeholder=""
              autoFocus
              className="outline-none text-white bg-transparent w-12"
              onBlur={() => setFocusedCustomTip(false)}
              onChange={(e) => onChangeTip(e.target.value, 'cash')}
            />
          </div>
          : <div
            className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${values.tipType === 'cash' ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
            onClick={() => setFocusedCustomTip(true)}
          >
            {values.tipType === 'cash' ? `$${values.tipAmount}` : '$__'}
          </div>
        }
      </div>
      {touched.tipAmount && errors.tipAmount && <div className='text-red-400 text-[12px] text-right mt-1'>{errors.tipAmount}</div>}
    </div>
    <p className="mt-2 text-white text-lg text-left">= Sub-Total</p>
    <div className="flex w-full">
      <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
        {subTotal}
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