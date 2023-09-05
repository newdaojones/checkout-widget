import { FormikProps } from "formik";
import React, { useMemo } from "react";
import { CheckoutInfo } from "../types/checkout.type";
import { useAuth } from "../context/auth";

interface Props extends FormikProps<CheckoutInfo> {
  onNext: () => void;
}

export const Login = ({
  touched,
  errors,
  values,
  setFieldTouched,
  setFieldValue,
  onNext,
}: Props) => {
  const totalAmount = useMemo(
    () =>
      values.cost
        ? Number(values.cost) +
        (Number(values.cost) * Number(values.tipAmount || 0)) / 100
        : 0,
    [values]
  );
  // const isRequiredLogin = useMemo(() => totalAmount >= 500, [totalAmount]);
  const isRequiredLogin = false

  const isValid = useMemo(
    () => !errors.userEmail && !errors.password && values.userEmail && values.password,
    [values, errors]
  );

  const { onLogin } = useAuth();

  const onSubmit = () => {
    if (!isValid) {
      return;
    }

    onLogin(values.userEmail, values.password as string);
  };

  return (
    <div className="widget-container flex flex-col">
      <h3 className="text-white text-4xl mb-10 text-center">Login</h3>
      <div className="flex-1 flex flex-col items-center justify-center">
        {isRequiredLogin && (
          <div className="text-center text-purple-600 mb-5">
            Required an account for purchasing over $500
          </div>
        )}
        <div className="flex flex-col justify-center w-full">
          <input
            value={values.userEmail}
            type="email"
            onBlur={() => setFieldTouched("userEmail", true)}
            onChange={(e) => setFieldValue("userEmail", e.target.value)}
            className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
            placeholder="Email"
          />
          {touched.userEmail && errors.userEmail && (
            <div className="text-red-400 text-[12px] text-left">
              {errors.userEmail}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center mt-3 w-full">
          <input
            value={values.password}
            type="password"
            onBlur={() => setFieldTouched("password", true)}
            onChange={(e) => setFieldValue("password", e.target.value)}
            className="text-white text-lg outline-none bg-white/20 pl-2 pr-2 w-full h-7 shadow-sm border-l-2 border-b-2 border-white rounded-sm placeholder-white"
            placeholder="Password"
          />
          {touched.password && !values.password && (
            <div className="text-red-400 text-[12px] text-left">
              Password is required
            </div>
          )}
        </div>
        <div className="text-white mt-5">
          Don't have an account?{" "}
          <span
            className="cursor-pointer text-purple-600"
            onClick={() => setFieldValue("auth", "signup")}
          >
            Sign up
          </span>
        </div>
      </div>
      {!isRequiredLogin && (
        <button
          onClick={onNext}
          className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white bg-gradient-to-b from-purple-400 to-purple-600`}
        >
          Skip
        </button>
      )}
      <button
        onClick={() => onSubmit()}
        className={`mt-4 text-white text-lg text-center w-full rounded-md h-11 border-2 border-white flex items-center justify-center shadow-md shadow-white ${isValid ? "bg-gradient-to-b from-purple-400 to-purple-600" : ""
          }`}
      >
        <div className="flex items-center">Login</div>
      </button>
    </div>
  );
};
