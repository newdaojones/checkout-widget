import React from "react";
import { Header } from "../components/header";
import { Route, Routes } from "react-router-dom";
import { Checkout } from "./checkout";

export const Main = () => {
  return <div className="app flex flex-col">
    <Header />
    <div className='flex items-center justify-center w-full flex-1 overflow-auto py-10'>
      <Routes>
        <Route path='/:checkoutRequestId' element={<Checkout />} />
        <Route path='/' element={<Checkout />} />
      </Routes>
    </div>
  </div>
}