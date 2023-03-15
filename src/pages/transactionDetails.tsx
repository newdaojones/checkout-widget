import React, { useEffect, useState } from "react";
import UsFlagImage from '../assets/images/us-flag.png'
import VisaIcon from '../assets/images/visa-icon.png'
import { CheckoutInfo } from "../types/checkout.type";
import moment from 'moment-timezone'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ClockLoader from 'react-spinners/ClockLoader'
import { toast } from "react-toastify";
import _ from 'lodash'
export const TransactionDetails = ({ checkoutInfo, transaction, onNext }: {
  transaction?: any,
  checkoutInfo: CheckoutInfo,
  onNext: () => void
}) => {
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (transaction?.paidStatus === 'paid' || transaction?.paidStatus === 'error') {
      setConfirmed(true)
    }
  }, [transaction])

  return (
    <div className='widget-container flex flex-col'>
      <h3 className="text-white text-4xl mb-10 text-center">{!transaction ? 'Pending' : `${_.capitalize(transaction.status)} - ${_.capitalize(transaction.step)}`}</h3>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-white text-lg text-left">Amount</p>
          <div className="flex w-full">
            <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
              {checkoutInfo.cost ? (Number(checkoutInfo.cost)).toFixed(2) : ''}
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
              {(!transaction || (transaction?.step === 'Charge' && transaction.status === 'processing')) ? 'Processing' : transaction.paidStatus === 'error' ? 'Failed' : 'Accepted'}
            </div>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              <img src={VisaIcon} alt='' className="!w-8" />
            </div>
          </div>
        </div>
        <div>
          <p className="text-white text-lg text-left">Transaction Status</p>
          <div className="flex w-full">
            <CopyToClipboard
              text={transaction?.transactionId ? `https://etherscan.io/tx/${transaction?.transactionId}` : ''}
              onCopy={() => {
                if (transaction?.transactionId) {
                  toast.success('Copied transaction')
                }
              }}>
              <div className="border-white border-2 cursor-pointer rounded-md h-11 bg-transparent flex-1 text-white text-md text-center text-lg p-2 shadow-sm shadow-white truncate overflow-hidden">
                <div className="truncate overflow-ellipsis">{transaction?.transactionId}</div>
              </div>
            </CopyToClipboard>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              ETH TX ID
            </div>
          </div>
        </div>
        <div>
          <p className="text-white text-lg text-left">Date</p>
          <div className="flex w-full">
            <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-lg p-2 shadow-sm shadow-white text-center">
              {transaction?.date ? moment(transaction?.date).format('MM DD YYYY') : ''}
            </div>
            <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
              {transaction?.date ? moment(transaction?.date).format('HH:mm') : ''}
            </div>
          </div>
        </div>
      </div>
      {(!transaction || transaction?.paidStatus === 'processing') && (
        <div className="mt-6 mb-2 text-left">
          <label className="text-white text-xs cursor-pointer select-none">
            <input className="checkbox" type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
            Check this box after you confirm that a copy of this receipt has been sent to your inbox
          </label>
        </div>
      )}
      {transaction?.paidStatus === 'processing' && (
        <div className="flex mt-2">
          <ClockLoader size={20} color='white' />
          <div className="text-white ml-2 items-center">{transaction.message}</div>
        </div>
      )}
      {transaction?.paidStatus === 'error' && (
        <div className='text-red-400 mt-2'>{transaction.message}</div>
      )}
      {transaction?.paidStatus === 'paid' && (
        <div className='text-green-500 mt-2'>{transaction.message}</div>
      )}
      <button
        onClick={() => confirmed && onNext()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${confirmed ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
      >
        Close View
      </button>
    </div>)
}