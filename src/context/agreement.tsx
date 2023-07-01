import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useAgreement = () => {
  const subWindowRef = useRef<any>(null);
  let [searchParams] = useSearchParams();
  const subSignedAgreementId = useMemo(() => searchParams.get('signed_agreement_id'), [searchParams])
  const [signedAgreementId, setSignedAgreementId] = useState<string>()

  const openAgreement = (url: string) => {
    setSignedAgreementId('')

    const subWindow = window.open(`${url}&redirect_uri=${window.origin}`, '_blank', 'width=600,height=400,left=200,top=200');

    if (subWindow) {
      subWindow.opener = window;
      subWindowRef.current = subWindow
    }
  }

  const handleMessage = (event: any) => {
    const res = event?.detail?.signed_agreement_id

    if (!res) {
      return
    }

    setSignedAgreementId(res)

    if (subWindowRef.current) {
      setTimeout(() => {
        subWindowRef.current.close()
      }, 41)
    }
  }

  useEffect(() => {
    if (subSignedAgreementId) {
      if (window.opener) {
        window.opener.dispatchEvent(new CustomEvent("signed_agreement_id", {
          detail: {
            signed_agreement_id: subSignedAgreementId
          }
        }))
      }
    }
  }, [subSignedAgreementId])

  useEffect(() => {
    window.addEventListener('signed_agreement_id', handleMessage);

    return () => {
      // Clean up event listener when component unmounts
      window.removeEventListener('signed_agreement_id', handleMessage);
    };
  })

  return {
    signedAgreementId,
    openAgreement,
  };
}