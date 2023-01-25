import React, { useState } from "react";
import UsFlagImage from '../assets/images/us-flag.png'
import VisaIcon from '../assets/images/visa-icon.png'
import { CheckoutInfo } from "../types/checkout.type";
import moment from 'moment-timezone'

export const TransactionDetails = ({ checkoutInfo, onNext }: {
  checkoutInfo: CheckoutInfo,
  onNext: () => void
}) => {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div className='widget-container flex flex-col'>
      <h3 className="text-white text-4xl mb-10 text-center">[tx-status]</h3>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-white text-lg text-left">Amount</p>
          <div className="flex w-full">
            <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
              {checkoutInfo.cost ? (Number(checkoutInfo.cost) + Number(checkoutInfo.cost) * Number(checkoutInfo.tipPercent || 0) / 100).toFixed(2) : ''}
            </div>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              <img src={UsFlagImage} alt='' className="flag mr-2" />
              USD
            </div>
          </div>
        </div>
        <div>
          <p className="text-white text-lg text-left">Payment Method</p>
          <div className="flex w-full">
            <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
              Accepted
            </div>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              <img src={VisaIcon} alt='' className="!w-8" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-white text-lg text-left">Transaction Status</p>
          <div className="flex w-full">
            <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-center text-lg p-2 shadow-sm shadow-white">
              0xbe53ca2 ... 9b77ccbf39
            </div>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              ETH TX ID
            </div>
          </div>
        </div>
        <div>
          <p className="text-white text-lg text-left">Date</p>
          <div className="flex w-full">
            <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-lg p-2 shadow-sm shadow-white text-center">
              {moment().format('MM DD YYYY')}
            </div>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              {moment().format('HH:MM')}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-2 text-left">
        <label className="text-white text-xs cursor-pointer select-none">
          <input className="checkbox" type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          Check this box after you confirm that a copy of this receipt has been sent to your inbox
        </label>
      </div>
      <button
        onClick={() => onNext()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${confirmed ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
      >
        Close View
      </button>
    </div>)
}