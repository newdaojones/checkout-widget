import React, { useRef, useEffect, useState } from 'react';
import * as _ from 'lodash'
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { TipAndSubTotal } from './pages/tipAndSubTotal';
import { MethodAndTotal } from './pages/methodAndTotal';
import { CardDetails } from './pages/cardDetails';
import { TransactionDetails } from './pages/transactionDetails';
import { CheckoutInfo } from './types/checkout.type';

function App() {
  const carousel = useRef<any>()
  const [currentStep, setCurrentStep] = useState(0)
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    cost: '',
    tipPercent: '',
    paymentMethod: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  })

  const onChangeCheckoutInfo = (key: string, value: any) => {
    const clonedCheckoutInfo: any = _.cloneDeep(checkoutInfo)

    clonedCheckoutInfo[key] = value;

    setCheckoutInfo(clonedCheckoutInfo)
  }

  const onNext = (index: number) => {

    if (index === 1 && !checkoutInfo.cost) {
      return
    }

    if (index === 2 && !checkoutInfo.paymentMethod) {
      return
    }

    if (index === 3 && (
      !checkoutInfo.firstName
      || !checkoutInfo.lastName
      || !checkoutInfo.email
      || !checkoutInfo.phoneNumber
      || !checkoutInfo.cardNumber
      || !checkoutInfo.expiry
      || !checkoutInfo.cvc
      || !checkoutInfo.addressLine1
      || !checkoutInfo.city
      || !checkoutInfo.state
      || !checkoutInfo.zip
      || !checkoutInfo.country)
    ) {
      return
    }

    carousel.current.moveTo(index)
  }

  return (
    <div className="app flex flex-col">
      <div className='header flex justify-end items-center pl-8 pr-8'>
        <input className='bg-transparent h-8 outline-none text-white mr-3' placeholder='Search' />
        <a className='text-white underline font-bold text-lg' href='https://jxndao.com/storefront' target="_blank">Storefront</a>
      </div>
      <div className='flex items-center justify-center w-full flex-1'>
        <div className='widget'>
          <Carousel
            ref={carousel}
            swipeable={false}
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            selectedItem={currentStep}
            onChange={(index) => setCurrentStep(index)}
            infiniteLoop={false}
          >
            <TipAndSubTotal
              checkoutInfo={checkoutInfo}
              onChange={onChangeCheckoutInfo}
              onNext={() => onNext(1)}
            />
            <MethodAndTotal
              checkoutInfo={checkoutInfo}
              onChange={onChangeCheckoutInfo}
              onNext={() => onNext(2)}
            />
            <CardDetails
              checkoutInfo={checkoutInfo}
              onChange={onChangeCheckoutInfo}
              onNext={() => onNext(3)}
            />
            <TransactionDetails
              checkoutInfo={checkoutInfo}
              onNext={() => onNext(0)}
            />
          </Carousel>
          <div className="flex mt-8 mb-8">
            <div onClick={() => onNext(0)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 0 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
            <div onClick={() => onNext(1)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 1 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
            <div onClick={() => onNext(2)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 2 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
            <div onClick={() => onNext(3)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 3 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
