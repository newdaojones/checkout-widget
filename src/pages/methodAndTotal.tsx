import { FormikProps } from "formik";
import { useMemo } from "react";
import UsFlagImage from '../assets/images/us-flag.png';
import UsdcIcon from '../assets/images/usdc-icon.png';
import { useAuth } from "../context/auth";
import { CheckoutInfo } from "../types/checkout.type";

interface Props extends FormikProps<CheckoutInfo> {
  onNext: () => void
}

export const MethodAndTotal = ({ touched, errors, values, setFieldValue, onNext }: Props) => {
  const { user } = useAuth();
  const costWithTip = useMemo(() => values.cost ? Number(values.cost) + Number(values.cost) * Number(values.tipPercent || 0) / 100 : 0, [values]);
  const fee = useMemo(() => Number((costWithTip * 0.06).toFixed(2)), [costWithTip])
  const total = useMemo(() => costWithTip + fee, [costWithTip, fee])

  const isValid = useMemo(() =>
    !errors.isConfirmedPurchase,
    [errors])

  return (
    <div className='widget-container flex flex-col'>
      <h3 className="text-white text-4xl mb-10 text-center">Method & Total</h3>
      <p className="text-white text-lg text-left">Goods + Tip</p>
      <div className="flex w-full">
        <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
          {costWithTip.toFixed(2)}
        </div>
        <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
          <img src={UsFlagImage} alt='' className="flag mr-2" />
          USD
        </div>
      </div>
      <p className="text-white text-lg text-left mt-2">+ Service Fee</p>
      <div className="flex w-full">
        <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
          {fee.toFixed(2)}
        </div>
        <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
          <img src={UsFlagImage} alt='' className="flag mr-2" />
          USD
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center">
      </div>
      <p className="text-white text-lg text-left">= Total</p>
      <div className="flex w-full">
        <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
          {total.toFixed(2)}
        </div>
        <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
          <img src={UsFlagImage} alt='' className="flag mr-2" />
          USD
        </div>
      </div>
      <div className="mt-6 mb-2 text-left">
        <label className="text-white text-xs cursor-pointer select-none">
          <input className="checkbox" type="checkbox" checked={values.isConfirmedPurchase} onChange={(e) => setFieldValue('isConfirmedPurchase', e.target.checked)} />
          Confirm your intent to use <span className="text-pink-500">Visa / Mastercard</span> checkout by checking the signature box. You can view your customer rights by reviewing our <a onClick={(e) => e.stopPropagation()} className="text-purple-500 underline" href="https://www.mybackpack.app/terms-of-service" target="_blank">terms of service (TOS)</a> and <a onClick={(e) => e.stopPropagation()} className="text-purple-500 underline" href="https://www.mybackpack.app/privacy-policy" target="_blank">privacy policy (PP)</a>.
        </label>
        {touched.isConfirmedPurchase && errors.isConfirmedPurchase && <div className='text-red-400 text-[12px] text-left'>{errors.isConfirmedPurchase}</div>}
      </div>
      <button
        disabled={!isValid}
        onClick={() => onNext()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
      >
        {user ? 'Card Details' : 'Proceed'}
      </button>
    </div>)
}