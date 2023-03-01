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
    tokenId: '',
    isConfirmedPurchase: false
  })

  const onChangeCheckoutInfo = (key: string, value: any) => {
    const clonedCheckoutInfo: any = _.cloneDeep(checkoutInfo)

    clonedCheckoutInfo[key] = value;

    setCheckoutInfo(clonedCheckoutInfo)
  }

  const onNext = (index: number, data: Partial<CheckoutInfo>) => {
    const values = {
      ...checkoutInfo,
      ...data
    }
    setCheckoutInfo(values)
    if (index === 1 && !values.cost) {
      return
    }

    if (index === 2 && !values.paymentMethod) {
      return
    }

    if (index === 3 && (
      !values.firstName
      || !values.lastName
      || !values.email
      || !values.phoneNumber
      || !values.tokenId
      || !values.streetAddress
      || !values.city
      || !values.state
      || !values.zip
      || !values.country)
    ) {
      return
    }

    carousel.current.moveTo(index)
  }

  return (
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
  );
}
