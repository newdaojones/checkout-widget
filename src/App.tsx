import React from 'react';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Checkout } from './pages/checkout';

function App() {
  return (
    <div className="app flex flex-col">
      <div className='header flex justify-end items-center pl-8 pr-8'>
        <input className='bg-transparent h-8 outline-none text-white mr-3' placeholder='Search' />
        <a className='text-white underline font-bold text-lg' href='https://jxndao.com/storefront' target="_blank">Storefront</a>
      </div>
      <div className='flex items-center justify-center w-full flex-1'>
        <Checkout />
      </div>
    </div>
  );
}

export default App;
