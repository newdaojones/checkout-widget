import React, { useEffect } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { useCheckout } from "../../context/checkout";
import { CoinFellaInformation } from "./info";
import { CoinFellaPayment } from "./payment";
import { CoinFellaTransaction } from "./transaction";

export const CoinFellaRequest = () => {
  const {
    setRequestId,
    checkout,
  } = useCheckout()

  const { checkoutRequestId } = useParams();

  useEffect(() => {
    setRequestId(checkoutRequestId)
  }, [checkoutRequestId, setRequestId])

  console.log(checkout)

  return <Routes>
    <Route path="/info" element={checkout ? <Navigate to={"../transaction"} replace /> : <CoinFellaInformation />} />
    <Route path="/payment" element={checkout ? <Navigate to={"../transaction"} replace /> : <CoinFellaPayment />} />
    <Route path="/transaction" element={<CoinFellaTransaction />} />
    <Route
      path="/*"
      element={<Navigate to={"./info"} replace />}
    />
  </Routes>
}