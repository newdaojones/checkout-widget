import React, { useState } from "react";
import UsFlagImage from '../assets/images/us-flag.png'

export const TipAndSubTotal = ({ cost, tipPercent, onChangeCost, onChangeTipPercent, onNext }: {
  cost?: number,
  tipPercent?: number,
  onChangeTipPercent: (value: number) => void
  onChangeCost: (value: number) => void
  onNext: () => void
}) => {
  const [focusedCustomTip, setFocusedCustomTip] = useState(false)
  const onChangeCostInput = (e: any) => {
    const value = e.target.value;

    if (!Number.isNaN(Number(value))) {
      onChangeCost(value)
    }
  }

  const onChangeCustomTipPercent = (e: any) => {
    const value = e.target.value;

    if (!Number.isNaN(Number(value))) {
      onChangeTipPercent(value)
    }
  }

  return (<div className='widget-container'>
    <h3 className="text-white text-4xl mb-10 text-center">Tip & Sub Total</h3>
    <p className="text-white text-lg text-left">Cost of Goods</p>
    <div className="flex w-full">
      <input
        value={cost}
        onChange={onChangeCostInput}
        className="border-white outline-none border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white"
      />
      <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
        <img src={UsFlagImage} alt='' className="flag mr-2" />
        USD
      </div>
    </div>
    <div>
      <p className="text-white text-lg mt-4 text-left">+ Tip (optional)</p>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {cost ? (Number(cost) * 0.1).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${tipPercent === 10 ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => onChangeTipPercent(10)}
        >
          10%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {cost ? (Number(cost) * 0.15).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${tipPercent === 15 ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => onChangeTipPercent(15)}
        >
          15%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {cost ? (Number(cost) * 0.2).toFixed(2) : ''}</p>
        <div
          className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${tipPercent === 20 ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
          onClick={() => onChangeTipPercent(20)}
        >
          20%
        </div>
      </div>
      <div className='mt-3 flex w-full justify-end items-center'>
        <p className='text-white text-lg m-0 mr-5'> {cost && tipPercent && ![10,15,20].includes(Number(tipPercent)) ? (Number(cost) * Number(tipPercent) / 100).toFixed(2) : ''}</p>
        {focusedCustomTip?
        <input
          value={[10, 15, 20].includes(Number(tipPercent)) ? undefined : tipPercent}
          placeholder="??%"
          autoFocus
          onBlur={() => setFocusedCustomTip(false)}
          onChange={onChangeCustomTipPercent}
          className={`h-11 bg-white/50 text-center outline-none text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white placeholder-white ${tipPercent && ![10,15,20].includes(Number(tipPercent)) ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
        />
        : <div
        className={`h-11 bg-white/50 text-white flex items-center justify-center w-24 rounded-md cursor-pointer shadow-md shadow-white ${tipPercent && ![10,15,20].includes(Number(tipPercent)) ? 'bg-gradient-to-b from-purple-200 to-purple-400' : ''}`}
        onClick={() => setFocusedCustomTip(true)}
      >
        {tipPercent && ![10,15,20].includes(Number(tipPercent)) ? `${Number(tipPercent)}%` : '??%'}
      </div>
        }
      </div>
    </div>
    <p className="mt-2 text-white text-lg text-left">= Sub-Total</p>
    <div className="flex w-full">
      <div className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md text-right text-lg p-2 shadow-sm shadow-white">
        {cost ? (Number(cost) + Number(cost) * Number(tipPercent || 0) / 100).toFixed(2) : ''}
      </div>
      <div className='border-2 border-white rounded-md h-11 w-24 ml-1 flex items-center justify-center text-white text-lg shadow-sm shadow-white'>
        <img src={UsFlagImage} alt='' className="flag mr-2" />
        USD
      </div>
    </div>
    <button
      disabled={!cost}
      onClick={() => onNext()}
      className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${cost ? 'bg-gradient-to-b from-purple-400 to-purple-600' : ''}`}
    >
      Get Total
    </button>
  </div>)
}