import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from "react-toastify";
import { GET_AGREEMENT_LINK } from "../utils/graphql";

export const PrimeTrustTerms = () => {
  const [params] = useSearchParams()
  const name = useMemo(() => params.get('name'), [params])

  const { data, error, loading } = useQuery(GET_AGREEMENT_LINK, {
    variables: {
      name
    },
    skip: !name
  })

  useEffect(() => {
    if (error) {
      toast.error(error?.message)
    }
  }, [error])

  if (loading) {
    return <div className="flex flex-col items-center justify-center">
      <FadeLoader color="white" />
      <div className='mt-2 text-white'>Loading Agreements...</div>
    </div>
  }

  if (error) {
    return <div></div>
  }


  return <div
    className="mt-auto w-[800px]"
    dangerouslySetInnerHTML={{ __html: data?.agreementPreview || '' }}></div>
}