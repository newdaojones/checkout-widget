import React, { useRef, useState } from 'react';
import * as _ from 'lodash'
import { TipAndSubTotal } from './tipAndSubTotal';
import { MethodAndTotal } from './methodAndTotal';
import { CardDetails } from './cardDetails';
import { TransactionDetails } from './transactionDetails';
import { CheckoutInfo } from '../types/checkout.type';
import { Carousel } from 'react-responsive-carousel';

export function Checkout() {
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
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    tokenId: ''
  })

  const onChangeCheckoutInfo = (key: string, value: any) => {
    const clonedCheckoutInfo: any = _.cloneDeep(checkoutInfo)

    clonedCheckoutInfo[key] = value;

    setCheckoutInfo(clonedCheckoutInfo)
  }

  const onNext = (index: number, data: CheckoutInfo) => {
    setCheckoutInfo(data)
    if (index === 1 && !data.cost) {
      return
    }

    if (index === 2 && !data.paymentMethod) {
      return
    }

    if (index === 3 && (
      !data.firstName
      || !data.lastName
      || !data.email
      || !data.phoneNumber
      || !data.tokenId
      || !data.streetAddress
      || !data.city
      || !data.state
      || !data.zip
      || !data.country)
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
            onNext={(data) => onNext(1, data)}
          />
          <MethodAndTotal
            checkoutInfo={checkoutInfo}
            onChange={onChangeCheckoutInfo}
            onNext={(data) => onNext(2, data)}
          />
          <CardDetails
            checkoutInfo={checkoutInfo}
            onNext={(data) => onNext(3, data)}
          />
          <TransactionDetails
            checkoutInfo={checkoutInfo}
            onNext={() => onNext(0, checkoutInfo)}
          />
        </Carousel>
        <div className="flex mt-8 mb-8">
          <div onClick={() => onNext(0, checkoutInfo)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 0 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
          <div onClick={() => onNext(1, checkoutInfo)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 1 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
          <div onClick={() => onNext(2, checkoutInfo)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 2 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
          <div onClick={() => onNext(3, checkoutInfo)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 3 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        </div>
      </div>
    </div>
  );
}
