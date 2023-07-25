import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { KYC_COMPLETED } from "../utils/graphql";

export const KycSuccess = () => {
  const [createKycCompleted] = useMutation(KYC_COMPLETED);


  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      window.close()
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  useEffect(() => {
    createKycCompleted()
  }, [])
  return <></>
}