import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { KYC_COMPLETED } from "../utils/graphql";

export const KycSuccess = () => {
  const [createKycCompleted] = useMutation(KYC_COMPLETED);


  useEffect(() => {
    createKycCompleted()
    setTimeout(() => {
      window.close()
    }, 1000)
  }, [])
  return <></>
}