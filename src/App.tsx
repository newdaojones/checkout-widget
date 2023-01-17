import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app flex flex-col">
      <div className='header'>
      </div>
      <div className='flex items-center justify-center w-full flex-1'>
        <div className='widget'>
          <div className='widget-container'>
            <h3 className="text-white text-4xl mb-10 text-center">Tip & Sub Total</h3>
            <p className="text-white text-lg">Cost of Goods</p>
            <div className="flex w-full">
              <input className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md"></input>
              <div className='border-2 border-white rounded-md h-11 w-24 ml-1'></div>
            </div>
            <div>
              <p className="text-white text-lg mt-4">+ Tip (optional)</p>
              <div>
                <div className='mt-3 flex w-full justify-end items-center'>
                  <p className='text-white text-lg m-0 mr-5'>XX.xx</p>
                  <div className="h-11 bg-gray-400 text-white flex items-center justify-center w-24 rounded-md cursor-pointer">
                    10%
                  </div>
                </div>
              </div>
              <div className='mt-3 flex w-full justify-end items-center'>
                <p className='text-white text-lg m-0 mr-5'>XX.xx</p>
                <div className="h-11 bg-gray-400 text-white flex items-center justify-center w-24 rounded-md cursor-pointer">
                  10%
                </div>
              </div>
              <div className='mt-3 flex w-full justify-end items-center'>
                <p className='text-white text-lg m-0 mr-5'>XX.xx</p>
                <div className="h-11 bg-gray-400 text-white flex items-center justify-center w-24 rounded-md cursor-pointer">
                  15%
                </div>
              </div>
              <div className='mt-3 flex w-full justify-end items-center'>
                <p className='text-white text-lg m-0 mr-5'>XX.xx</p>
                <div className="h-11 bg-gray-400 text-white flex items-center justify-center w-24 rounded-md cursor-pointer">
                  20%
                </div>
              </div>
              <div className='mt-3 flex w-full justify-end items-center'>
                <p className='text-white text-lg m-0 mr-5'>XX.xx</p>
                <div className="h-11 bg-gray-400 text-white flex items-center justify-center w-24 rounded-md cursor-pointer">
                  ??%
                </div>
              </div>
            </div>
            <p className="mt-2 text-white text-lg">= Cost of Goods</p>
            <div className="flex w-full">
              <input className="border-white border-2 rounded-md h-11 bg-transparent flex-1 text-white text-md"></input>
              <div className='border-2 border-white rounded-md h-11 w-24 ml-1'></div>
            </div>
            <div className='mt-4 text-white text-lg text-center rounded-md h-11 border-2 border-white flex items-center justify-center'>
              Get Total
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
