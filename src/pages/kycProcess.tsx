import React from "react";
import { useAuth } from "../context/auth";

interface Props {
  onNext: () => void;
}

export const KycProcess = ({
  onNext,
}: Props) => {
  const { user } = useAuth()
  return (
    <div className="widget-container flex flex-col">
      <h3 className="text-white text-4xl mb-10 text-center">KYC Process</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center text-white mb-5">
          {user.status === 'rejected' ? 'Failed KYC, please try again' : 'Required KYC process for trading assets'}
        </div>

      </div>
      <button
        onClick={() => onNext()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white bg-gradient-to-b from-purple-400 to-purple-600`}
      >
        <div className="flex items-center">Process</div>
      </button>
    </div>
  );
};
