import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { TipAndSubTotal } from './pages/tipAndSubTotal';
import { MethodAndTotal } from './pages/methodAndTotal';

function App() {
  const [cost, setCost] = useState<number>()
  const [tipPercent, setTipPercent] = useState<number>()
  const [paymentMethod, setPaymentMethod] = useState<string>()

  const carousel = useRef<any>()

  useEffect(() => {
    console.log(carousel)
  }, [carousel])

  return (
    <div className="app flex flex-col">
      <div className='header'>
      </div>
      <div className='flex items-center justify-center w-full flex-1'>
        <div className='widget'>
          <Carousel
            ref={carousel}
            swipeable={false}
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={false}
          >
            <TipAndSubTotal
              cost={cost}
              tipPercent={tipPercent}
              onChangeCost={(value) => setCost(value)}
              onChangeTipPercent={(value) => setTipPercent(value)}
              onNext={() => carousel.current.moveTo(1)}
            />
            <MethodAndTotal
              cost={cost}
              tipPercent={tipPercent}
              paymentMethod={paymentMethod}
              onChangePaymentMethod={(value) => setPaymentMethod(value)}
              onNext={() => carousel.current.moveTo(2)}
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default App;
