import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TipAndSubTotal } from './tipAndSubTotal';
import { MethodAndTotal } from './methodAndTotal';
import { CardDetails } from './cardDetails';
import { TransactionDetails } from './transactionDetails';
import { CheckoutInfo } from '../types/checkout.type';
import Carousel from 'react-multi-carousel'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { ACCOUNT_VERIFY, CREATE_ACCOUNT, CREATE_CHECKOUT, CREATE_CHECKOUT_WITHOUT_USER, GET_CHECKOUT, GET_CHECKOUT_REQUEST, TRANSACTION_SUBSCRIPTION } from '../utils/graphql';
import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { checkoutValidationSchema } from '../constants/validations';
import { useNavigate, useParams } from 'react-router-dom';
import { Login } from './login';
import { SignUp } from './signup';
import { useAuth } from '../context/auth';
import ClockLoader from 'react-spinners/ClockLoader'
import { useWindowFocus } from '../uses/useWindowFocus';

const CHECKOUT_STORAGE_ID = 'CHECKOUT/CHECKOUT_STORAGE_ID'

export function Checkout() {
  const { user, refreshUser } = useAuth()
  const { checkoutRequestId } = useParams();
  const navigate = useNavigate();

  const SocureInitializer = (window as any).SocureInitializer
  const devicer = (window as any).devicer
  const Socure = (window as any).Socure
  const [isSocureProcess, setIsSocureProcess] = useState(false)
  const [storedCheckoutId] = useState<string | null>(localStorage.getItem(CHECKOUT_STORAGE_ID))
  const carousel = useRef<any>()
  const [currentStep, setCurrentStep] = useState(0)
  const [deviceId, setDeviceId] = useState<string>()
  const [documentId, setDocumentId] = useState<string>()
  const [isVerifying, setIsVerifing] = useState(false)
  const [checkout, setCheckout] = useState<any>()
  const [transaction, setTransaction] = useState<any>();
  const { isWindowFocused } = useWindowFocus()
  const { data: checkoutRequest, error: checkoutRequestError } = useQuery(GET_CHECKOUT_REQUEST, {
    variables: {
      id: checkoutRequestId
    },
    skip: !checkoutRequestId
  })
  const [createCheckout, { data: checkoutResponse, loading: loadingCheckout, error: errorCheckout, reset: resetCheckout }] = useMutation(CREATE_CHECKOUT);
  const [createCheckoutWithoutUser, { data: checkoutWithoutUserRes, loading: loadingCheckoutWithout, error: errorCheckoutWithoutUser, reset: resetCheckoutWithoutUser }] = useMutation(CREATE_CHECKOUT_WITHOUT_USER);
  const [createAccount, { data: createAccountResponse, loading: loadingCreateAccount, error: createAccountError, reset: resetCreateAccount }] = useMutation(CREATE_ACCOUNT)
  const { data: checkoutData, refetch: refetchCheckout } = useQuery(GET_CHECKOUT, {
    variables: {
      id: storedCheckoutId
    },
    skip: !storedCheckoutId
  })

  const userId = useMemo(() => createAccountResponse?.createUser?.id, [createAccountResponse])
  const checkoutError = useMemo(() => errorCheckout || errorCheckoutWithoutUser, [errorCheckout, errorCheckoutWithoutUser])
  const checkoutId = useMemo(() => checkout?.id, [checkout])
  const checkoutLoading = useMemo(() => loadingCheckout || loadingCheckoutWithout, [loadingCheckout, loadingCheckoutWithout])
  const isFinalStep = useMemo(() => user ? currentStep === 3 : currentStep === 4, [user, currentStep])
  const isDisabledSteps = useMemo(() => isFinalStep || isVerifying, [isFinalStep, isVerifying])
  const { data: transactionResponse } = useSubscription(TRANSACTION_SUBSCRIPTION, {
    variables: {
      checkoutId,
    },
    shouldResubscribe: isWindowFocused,
    skip: !checkoutId || !isWindowFocused
  })
  const { data: userVerify, error: userVerifyError } = useSubscription(ACCOUNT_VERIFY, {
    variables: {
      userId
    },
    skip: !userId
  })

  const onSubmitForm = (data: CheckoutInfo) => {
    console.log(data)
    if (user) {
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
            feeMethod: data.feeMethod,
            streetAddress: data.streetAddress,
            streetAddress2: data.streetAddress2 || undefined,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country || undefined,
            walletAddress: data.walletAddress,
            checkoutRequestId,
          }
        }
      })
    } else {
      createCheckoutWithoutUser({
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
            feeMethod: data.feeMethod,
            streetAddress: data.streetAddress,
            streetAddress2: data.streetAddress2 || undefined,
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: data.country || undefined,
            walletAddress: data.walletAddress,
            checkoutRequestId,
          }
        }
      })
    }
  }

  const checkoutInfo = useFormik<CheckoutInfo>({
    initialValues: {
      cost: '',
      tipPercent: '',
      feeMethod: 0,
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
      auth: 'login',
      userEmail: '',
      userPhoneNumber: ''
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: checkoutValidationSchema,
    onSubmit: onSubmitForm
  });
  const { values, errors, setFieldValue, setValues, setErrors, setTouched } = checkoutInfo

  console.log(errors)

  const onNext = (index: number, force = false) => {
    if (isDisabledSteps && !force) {
      return
    }

    carousel.current.goToSlide(index)
  }

  useEffect(() => {
    setFieldValue('userEmail', values.email)
    setFieldValue('userPhoneNumber', values.phoneNumber)
  }, [values, setFieldValue])

  const onResetForm = () => {
    setValues({
      cost: '',
      tipPercent: '',
      feeMethod: 0,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: checkoutRequest ? checkoutRequest.checkoutRequest?.email : user?.email || '',
      phoneNumber: checkoutRequest ? checkoutRequest.checkoutRequest?.phoneNumber : user?.phoneNumber || '',
      streetAddress: user?.streetAddress || '',
      streetAddress2: user?.streetAddress2 || '',
      city: user?.city || '',
      state: user?.state || '',
      zip: user?.zip || '',
      country: user?.country || 'US',
      isValidCard: false,
      isConfirmedPurchase: false,
      walletAddress: '',
      token: '',
      taxId: '',
      gender: 'male',
      dob: undefined,
      auth: 'login',
      password: '',
      userEmail: '',
      userPhoneNumber: ''
    })
    setErrors({})
    setTouched({})
    resetCheckout()
    resetCheckoutWithoutUser()
    resetCreateAccount()
    setTransaction(null)
    localStorage.removeItem(CHECKOUT_STORAGE_ID)
    navigate('/')
    onNext(0, true)
  }

  useEffect(() => {
    if (checkoutError) {
      toast.error(checkoutError.message)
      setFieldValue('isValidCard', false)
      setFieldValue('token', '')
      onNext(0)
      resetCheckout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutError, setFieldValue])

  useEffect(() => {
    if (checkout?.id) {
      onNext(user ? 3 : 4)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkout])

  useEffect(() => {
    if (transaction?.paidStatus === 'error') {
      toast.error(transaction.message)
    }
  }, [transaction])

  useEffect(() => {
    if (userVerifyError) {
      toast.error(userVerifyError.message)
    }
  }, [userVerifyError])

  useEffect(() => {
    if (transaction?.paidStatus === 'paid') {
      toast.success(transaction.message)
    }
  }, [transaction])

  useEffect(() => {
    if (checkoutRequest) {
      setFieldValue('cost', checkoutRequest.checkoutRequest.amount, false)
      setFieldValue('walletAddress', checkoutRequest.checkoutRequest.walletAddress, false)
      setFieldValue('phoneNumber', checkoutRequest.checkoutRequest.phoneNumber, false)
      setFieldValue('email', checkoutRequest.checkoutRequest.email, false)
    }
  }, [checkoutRequest, setFieldValue])

  useEffect(() => {
    if (checkoutRequestError) {
      toast.error(checkoutRequestError.message)
    }
  }, [checkoutRequestError])

  useEffect(() => {
    setFieldValue('firstName', user?.firstName || '', false)
    setFieldValue('lastName', user?.lastName || '', false)
    if (!checkoutRequest?.checkoutRequest?.email) {
      setFieldValue('email', user?.email || '', false)
    }
    if (!checkoutRequest?.checkoutRequest?.phoneNumber) {
      setFieldValue('phoneNumber', user?.phoneNumber || '', false)
    }
    setFieldValue('streetAddress', user?.streetAddress || '', false)
    setFieldValue('streetAddress2', user?.streetAddress2 || '', false)
    setFieldValue('city', user?.city || '', false)
    setFieldValue('state', user?.state || '', false)
    setFieldValue('zip', user?.zip || '', false)
    setFieldValue('country', user?.country || 'US', false)
    setFieldValue('password', '', false)
  }, [checkoutRequest, user, setFieldValue])

  useEffect(() => {
    if (checkoutData?.checkout) {
      setFieldValue('firstName', checkoutData?.checkout.firstName || '', false)
      setFieldValue('lastName', checkoutData?.checkout.lastName || '', false)
      setFieldValue('email', checkoutData?.checkout.email || '', false)
      setFieldValue('phoneNumber', checkoutData?.checkout.phoneNumber || '', false)
      setFieldValue('streetAddress', checkoutData?.checkout.streetAddress || '', false)
      setFieldValue('streetAddress2', checkoutData?.checkout.streetAddress2 || '', false)
      setFieldValue('city', checkoutData?.checkout.city || '', false)
      setFieldValue('state', checkoutData?.checkout.state || '', false)
      setFieldValue('zip', checkoutData?.checkout.zip || '', false)
      setFieldValue('country', checkoutData?.checkout.country || 'US', false)
      setFieldValue('cost', checkoutData?.checkout.amount, false)
      setFieldValue('tipPercent', checkoutData?.checkout.tip, false)

      if (checkoutData.checkout.transaction) {
        setTransaction(checkoutData.checkout.transaction)
      }
    }
  }, [checkoutData, setFieldValue])

  useEffect(() => {
    if (createAccountError) {
      cleanSocure()
      toast.error(createAccountError.message)
    }
  }, [createAccountError])

  useEffect(() => {
    if (userVerify?.userVerify?.status === 'opened') {
      localStorage.setItem('auth_token', userVerify?.userVerify?.token)
      setIsVerifing(false)
      refreshUser()
    } else if (userVerify?.userVerify?.status === 'denied') {
      setIsVerifing(false)
      toast.error('Denied your KYC process, please try again')
    }
  }, [userVerify])

  const onCreateAccount = useCallback(() => {
    if (!isSocureProcess || !documentId || !deviceId) {
      return
    }

    setIsSocureProcess(false)
    createAccount({
      variables: {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          gender: values.gender || 'male',
          dob: values.dob,
          taxId: values.taxId,
          streetAddress: values.streetAddress,
          streetAddress2: values.streetAddress2,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
          documentId,
          deviceId,
        }
      }
    })
  }, [isSocureProcess, documentId, deviceId, values, createAccount])

  useEffect(() => {
    onCreateAccount()
  }, [onCreateAccount])

  useEffect(() => {
    if (userId) {
      setIsVerifing(true);
    }
  }, [userId])

  const initSourcer = () => {
    var config = {
      onProgress: (res: any) => { },
      onSuccess: (res: any) => {
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
    SocureInitializer.init(process.env.REACT_APP_SOCURE_PUBLIC_KEY)
      .then((lib: any) => {
        lib.init(process.env.REACT_APP_SOCURE_PUBLIC_KEY, "#socure", config).then(function () {
          lib.start(1);
        })
      }).catch((err: any) => {
      })
  }

  const getDeviceId = () => {
    var deviceFPOptions = {
      publicKey: process.env.REACT_APP_SOCURE_PUBLIC_KEY,
      userConsent: true,
      context: 'signup'
    };
    devicer.run(deviceFPOptions, function (response: any) {
      setDeviceId(response.sessionId)
    })
  }

  const cleanSocure = () => {
    Socure?.cleanup()
  }

  useEffect(() => {
    if (isSocureProcess) {
      initSourcer()
      getDeviceId()
    }

    return () => {
      cleanSocure()
    }
  }, [isSocureProcess])

  useEffect(() => {
    if (checkout) {
      localStorage.setItem(CHECKOUT_STORAGE_ID, checkout.id)
    } else {
      localStorage.removeItem(CHECKOUT_STORAGE_ID)
    }
  }, [checkout])

  useEffect(() => {
    setCheckout(checkoutResponse?.createCheckout)
  }, [checkoutResponse])

  useEffect(() => {
    setCheckout(checkoutWithoutUserRes?.createCheckoutWithoutUser)
  }, [checkoutWithoutUserRes])

  useEffect(() => {
    setCheckout(checkoutData?.checkout)
  }, [checkoutData])

  useEffect(() => {
    setTransaction(transactionResponse?.transaction)
  }, [transactionResponse])

  useEffect(() => {
    if (isWindowFocused) {
      refetchCheckout()
    }
  }, [isWindowFocused])

  return (
    <div className={`widget ${isSocureProcess && currentStep === 2 ? 'white' : ''}`}>
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
        {values.auth === 'signup' && !user &&
          <>
            {isVerifying ? <div className='widget-container flex flex-col flex-1 items-center justify-center text-white'>
              <ClockLoader size={30} color='white' className="mb-4" />
              Processing KYC, please wait...
            </div>
              : isSocureProcess ? <div id='socure' /> : <SignUp
                {...checkoutInfo}
                onNext={() => {
                  setIsSocureProcess(true)
                }}
              />}
          </>
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
      {(checkoutLoading || loadingCreateAccount) && (
        <div className="absolute w-full h-full bg-white/10 flex flex-col items-center justify-center top-0">
          <FadeLoader color="white" />
          <div className='mt-2 text-black'>{loadingCreateAccount ? 'Creating account...' : 'Sending request...'}</div>
        </div>
      )}
    </div>
  );
}
