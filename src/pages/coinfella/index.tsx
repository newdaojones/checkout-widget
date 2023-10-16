import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useCheckout } from "../../context/checkout";
import { CoinFellaInformation } from "./info";
import { CoinFellaSignup } from "./singup";
import { CoinFellaPayment } from "./payment";
import { CoinFellaTransaction } from "./transaction";

export const CoinFella = () => {
  const {
    setRequestId,
    checkout,
  } = useCheckout()

  const { checkoutRequestId } = useParams();

  useEffect(() => {
    setRequestId(checkoutRequestId)
  }, [checkoutRequestId, setRequestId])

  return <div className="coinfella bg-black w-full h-full flex items-center justify-center">
    <div className="max-w-lg w-full h-full p-2">
      <Routes>
        <Route path="/info" element={checkout ? <Navigate to={"../transaction"} replace /> : <CoinFellaInformation />} />
        <Route path="/payment" element={checkout ? <Navigate to={"../transaction"} replace /> : <CoinFellaPayment />} />
        <Route path="/transaction" element={<CoinFellaTransaction />} />
        <Route path="/signup" element={<CoinFellaSignup />} />
        <Route
          path="/*"
          element={<Navigate to={"./info"} replace />}
        />
      </Routes>
    </div>
  </div>
}