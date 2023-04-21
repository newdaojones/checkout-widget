import React, { useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment-timezone';
import { TipAndSubTotal } from './tipAndSubTotal';
import { MethodAndTotal } from './methodAndTotal';
import { CardDetails } from './cardDetails';
import { TransactionDetails } from './transactionDetails';
import { CheckoutInfo } from '../types/checkout.type';
import { Carousel } from 'react-responsive-carousel';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { CREATE_CHECKOUT, GET_CHECKOUT_REQUEST, TRANSACTION_SUBSCRIPTION } from '../utils/graphql';
import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { checkoutValidationSchema } from '../constants/validations';
import { useNavigate, useParams } from 'react-router-dom';

interface QueryParams {
  checkoutRequestId: string;
}

export function Checkout() {
  const { checkoutRequestId } = useParams();
  const navigate = useNavigate();

  const SocureInitializer = (window as any).SocureInitializer
  const devicer = (window as any).devicer
  const Socure = (window as any).Socure

  const { data: checkoutRequest, error: checkoutRequestError } = useQuery(GET_CHECKOUT_REQUEST, {
    variables: {
      id: checkoutRequestId
    },
    skip: !checkoutRequestId
  })

  const [createCheckout, { data: checkoutResponse, loading: loadingCheckout, error, reset: resetCheckout }] = useMutation(CREATE_CHECKOUT);
  const { data: transactionResponse } = useSubscription(TRANSACTION_SUBSCRIPTION, {
    variables: {
      checkoutId: checkoutResponse?.createCheckout?.id
    }
  })
  const transaction = useMemo(() => transactionResponse?.transaction, [transactionResponse])

  const onSubmitForm = (data: CheckoutInfo) => {
    createCheckout({
      variables: {
        data: {
          checkoutTokenId: data.token,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          amount: Number(data.cost),
          tip: data.tipPercent ? Number(data.tipPercent) : 0,
          tipType: 'percent',
          fee: 0,
          feeType: 'percent',
          streetAddress: data.streetAddress,
          streetAddress2: data.streetAddress2 || undefined,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country || undefined,
          walletAddress: data.walletAddress,
          checkoutRequestId,
          dob: data.dob ? moment(data.dob).format('YYYY-MM-DD') : undefined,
          taxId: data.taxId,
          gender: data.gender || 'male',
          deviceId,
          documentId
        }
      }
    })
  }

  const checkoutInfo = useFormik<CheckoutInfo>({
    initialValues: {
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
      country: 'US',
      isValidCard: false,
      isConfirmedPurchase: false,
      walletAddress: '',
      token: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: checkoutValidationSchema,
    onSubmit: onSubmitForm
  });
  const { values, errors, setFieldValue, setValues, setErrors, setTouched } = checkoutInfo

  const carousel = useRef<any>()
  const [currentStep, setCurrentStep] = useState(0)
  const [documentId, setDocumentId] = useState<string>()
  const [deviceId, setDeviceId] = useState<string>()
  const totalAmount = useMemo(() => values.cost ? (Number(values.cost) + Number(values.cost) * Number(values.tipPercent || 0) / 100) : 0, [values])
  const isRequiredSocure = useMemo(() => totalAmount >= 500, [totalAmount])

  const onNext = (index: number) => {
    if (index === 1 && (!values.cost || errors.cost || errors.tipPercent)) {
      return
    }

    if (index === 2 && (errors.paymentMethod || errors.isConfirmedPurchase)) {
      return
    }

    if (index === 3 && (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.phoneNumber ||
      errors.country ||
      errors.zip ||
      errors.state ||
      errors.city ||
      errors.streetAddress ||
      errors.streetAddress2)
    ) {
      return
    }

    carousel.current.moveTo(index)
  }

  const onResetForm = () => {
    setValues({
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
      country: 'US',
      isValidCard: false,
      isConfirmedPurchase: false,
      walletAddress: '',
      token: '',
      taxId: '',
      gender: 'male',
      dob: undefined
    })
    setErrors({})
    setTouched({})
    resetCheckout()
    navigate('/')
    onNext(0)
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
      cleanSocure()
      setFieldValue('isValidCard', false)
      setFieldValue('token', '')
      onNext(0)
      resetCheckout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, setFieldValue])

  useEffect(() => {
    if (checkoutResponse?.createCheckout?.id) {
      onNext(3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutResponse])

  useEffect(() => {
    if (transaction?.paidStatus === 'error') {
      toast.error(transaction.message)
    }
  }, [transaction])

  useEffect(() => {
    if (transaction?.paidStatus === 'paid') {
      toast.success(transaction.message)
    }
  }, [transaction])

  useEffect(() => {
    if (checkoutRequest) {
      setFieldValue('cost', checkoutRequest.checkoutRequest.amount)
      setFieldValue('walletAddress', checkoutRequest.checkoutRequest.walletAddress)
      setFieldValue('phoneNumber', checkoutRequest.checkoutRequest.phoneNumber)
      setFieldValue('email', checkoutRequest.checkoutRequest.email)
    }
  }, [checkoutRequest, setFieldValue])

  useEffect(() => {
    if (checkoutRequestError) {
      toast.error(checkoutRequestError.message)
    }
  }, [checkoutRequestError])

  const initSourcer = () => {
    var config = {
      onProgress: (res: any) => {},
      onSuccess: (res: any) => {
        console.log(res)
        if (res.status === 'DOCUMENTS_UPLOADED') {
          setDocumentId(res.documentUuid)
        }
      },
      onError: (err: any) => {
        toast.error('Failed verify your identify, please try again')
        Socure.cleanup()
      },
      qrCodeNeeded: true //toggle the QR code display
    };
    SocureInitializer.init(process.env.REACT_APP_WS_URL)
      .then((lib: any) => {
        lib.init(process.env.REACT_APP_WS_URL, "#socure", config).then(function () {
          lib.start(1);
        })
      }).catch((err: any) => {
      })
  }

  const getDeviceId = () => {
    var deviceFPOptions = {
      publicKey: process.env.REACT_APP_WS_URL,
      userConsent: true,
      context: 'signup'
    };
    devicer.run(deviceFPOptions, function (response: any) {
      console.log(response)
      setDeviceId(response.sessionId)
    })
  }

  const cleanSocure = () => {
    setDeviceId(undefined)
    setDocumentId(undefined)
    Socure?.cleanup()
  }

  useEffect(() => {
    if (isRequiredSocure) {
      initSourcer()
      getDeviceId()
    }

    return () => {
      cleanSocure()
    }
  }, [isRequiredSocure])

  return (
    <div className={`widget ${isRequiredSocure && !documentId && currentStep === 2 ? 'white' : ''}`}>
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
          {...checkoutInfo}
          checkoutRequestId={checkoutRequestId}
          onNext={() => onNext(1)}
        />
        <MethodAndTotal
          {...checkoutInfo}
          onNext={() => onNext(2)}
        />
        {(isRequiredSocure && !documentId) ? (<div id='socure' />) : <>{
          currentStep === 2 ? <CardDetails
            checkoutRequestId={checkoutRequestId}
            {...checkoutInfo}
          /> : <></>
        }</>}
        <TransactionDetails
          transaction={transactionResponse?.transaction}
          checkoutInfo={values}
          onNext={() => onResetForm()}
        />
      </Carousel>
      <div className="flex mt-8 mb-8">
        <div onClick={() => currentStep !== 3 && onNext(0)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 0 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        <div onClick={() => currentStep !== 3 && onNext(1)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 1 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        <div onClick={() => currentStep !== 3 && onNext(2)} className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 2 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
        <div className={`w-4 h-4 ml-2 mr-2 rounded-full cursor-pointer ${currentStep === 3 ? 'bg-gradient-to-b from-purple-400 to-purple-600' : 'bg-white'}`}></div>
      </div>
      {(loadingCheckout) && (
        <div className="absolute w-full h-full bg-white/10 flex flex-col items-center justify-center top-0">
          <FadeLoader color="white" />
          <div className='mt-2 text-black'>Sending request...</div>
        </div>
      )}
    </div>
  );
}
