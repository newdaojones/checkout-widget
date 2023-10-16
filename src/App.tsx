import React from 'react';
import './App.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { Checkout } from './pages/checkout';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './services';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/auth';
import { Header } from './components/header';
import { PrimeTrustTerms } from './pages/primeTrustTerms';
import { KycSuccess } from './pages/kycSucess';
import { AgreementAccept } from './pages/agreementAccept';
import { KybSuccess } from './pages/kybSucess';
import { CoinFella } from './pages/coinfella';
import { Main } from './pages';
import { CheckoutProvider } from './context/checkout';

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <CheckoutProvider>
            <Routes>
              <Route path='/prime-trust/terms' element={<PrimeTrustTerms />} />
              <Route path='/kyc-success' element={<KycSuccess />} />
              <Route path='/kyb-success/:partnerId' element={<KybSuccess />} />
              <Route path='/agreement-accept' element={<AgreementAccept />} />
              <Route path='/coinfella/:checkoutRequestId/*' element={<CoinFella />} />
              <Route path='/*' element={<Main />} />
            </Routes>
          </CheckoutProvider>
          <ToastContainer />
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
