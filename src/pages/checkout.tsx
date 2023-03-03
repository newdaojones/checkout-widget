import React, { useRef, useState } from 'react';
import * as _ from 'lodash'
import { TipAndSubTotal } from './tipAndSubTotal';
import { MethodAndTotal } from './methodAndTotal';
import { CardDetails } from './cardDetails';
import { TransactionDetails } from './transactionDetails';
import { CheckoutInfo } from '../types/checkout.type';
import { Carousel } from 'react-responsive-carousel';
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT } from '../utils/graphql';

export function Checkout() {
  const [createCheckout, { data: checkoutResponse, loading, error }] = useMutation(CREATE_CHECKOUT);
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

  const onSubmit = (data: Partial<CheckoutInfo>) => {
    const values = {
      ...checkoutInfo,
      ...data
    }

    createCheckout({
      variables: {
        data: {
          checkoutTokenId: values.tokenId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          amount: Number(values.cost),
          tip: values.tipPercent ? Number(values.tipPercent) : 0,
          tipType: 'percent',
          streetAddress: values.streetAddress,
          streetAddress2: values.streetAddress2 || undefined,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country || undefined,
        }
      }
    })
  }

  console.log(checkoutResponse, error, loading)

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
          onNext={(data) => onSubmit(data)}
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
