import { useEffect, useMemo, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import FadeLoader from 'react-spinners/FadeLoader';
import { Login } from './login';
import { SignUp } from './signup';
import { CardDetails } from './cardDetails';
import { MethodAndTotal } from './methodAndTotal';
import { TipAndSubTotal } from './tipAndSubTotal';
import { TransactionDetails } from './transactionDetails';
import { KycProcess } from './kycProcess';
import { useCheckout } from '../context/checkout';
import { useParams } from 'react-router-dom';

export function Checkout() {
  const {
    user,
    checkoutRequest,
    // checkoutRequestId,
    setRequestId,
    checkoutInfo,
    checkout,
    checkoutError,
    transaction,
    isLoading,
    loadingMessage,
    isProcessingKyc,
    onProcessKyc,
    onCreateAccount
  } = useCheckout()

  const { checkoutRequestId } = useParams();

  const carousel = useRef<any>()
  const [currentStep, setCurrentStep] = useState(0)
  const isFinalStep = useMemo(() => user ? currentStep === 3 : currentStep === 4, [user, currentStep])
  const isDisabledSteps = useMemo(() => isFinalStep || isProcessingKyc, [isFinalStep, isProcessingKyc])

  const { values } = checkoutInfo

  const onNext = (index: number, force = false) => {
    if (isDisabledSteps && !force) {
      return
    }

    carousel.current.goToSlide(index)
  }

  const onResetForm = () => {
    window.location.href = '/'
  }

  useEffect(() => {
    if (checkoutError) {
      onNext(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutError])

  useEffect(() => {
    if (checkout?.id) {
      onNext(user ? 3 : 4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout])

  useEffect(() => {
    setRequestId(checkoutRequestId)
  }, [setRequestId, checkoutRequestId])

  return (
    <div className="widget">
      <Carousel
        ref={carousel}
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={3000}
        centerMode={false}
        containerClass="container"
        draggable={false}
        swipeable={false}
        focusOnSelect={false}
        infinite={false}
        keyBoardControl={false}
        itemClass=""
        afterChange={(index, state) => {
          setCurrentStep(state.currentSlide)
        }}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 1
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 1
          }
        }}
      >
        <TipAndSubTotal
          {...checkoutInfo}
          checkoutRequestId={checkoutRequestId}
          onNext={() => onNext(1)}
        />
        <MethodAndTotal
          {...checkoutInfo}
          onNext={() => onNext(2)}
        />
        {user && !user?.isVerified && <KycProcess onNext={() => onProcessKyc()} />}
        {values.auth === 'signup' && !user &&
          <SignUp
            {...checkoutInfo}
            onNext={() => onCreateAccount()}
          />
        }
        {values.auth === 'login' && !user && <Login
          {...checkoutInfo}
          onNext={() => onNext(currentStep + 1)}
        />}
        <CardDetails
          checkoutRequest={checkoutRequest?.checkoutRequest}
          {...checkoutInfo}
        />
        <TransactionDetails
          transaction={transaction}
          checkoutInfo={values}
          onNext={() => onResetForm()}
        />
      </Carousel>
      <div className="flex mt-8 mb-8">
        <div onClick={() => currentStep > 0 && onNext(0)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 0 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        <div onClick={() => currentStep > 1 && onNext(1)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 1 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        <div onClick={() => currentStep > 2 && onNext(2)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 2 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        {!user && <div className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 3 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>}
        <div className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${(!user ? currentStep === 4 : currentStep === 3) ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
      </div>
      {isLoading && (
        <div className="absolute w-full h-full bg-white/10 flex flex-col items-center justify-center top-0">
          <FadeLoader color="white" />
          <div className='mt-2 text-white'>{loadingMessage}</div>
        </div>
      )}
    </div>
  );
}
