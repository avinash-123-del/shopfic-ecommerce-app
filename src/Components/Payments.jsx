import React, { useContext, useState } from 'react';
import { ProductDataContext } from './ContextProvider';

const Payments = () => {
  const { setpaymentMethod } = useContext(ProductDataContext);

  const payButtons = [
    {
      id: 1,
      name: 'Google pay',
      src: '/gpay.png',
    },
    {
      id: 2,
      name: 'Phonepe',
      src: '/phonepe.png',
    },
    {
      id: 3,
      name: 'paypal',
      src: '/paypal.png',
    },
    {
      id: 4,
      name: 'mastercard',
      src: '/mastercard.png',
    },
    {
      id: 5,
      name: 'Cash on Delivery',
      src: '/cod.png',
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePay = (e) => {
    setpaymentMethod(e.name);
    setSelectedPayment(e.id); // Store the ID of the selected payment
  };

  return (
    <div className='ml-9 mb-8'>
      <h1 className='font-ubunt text-lg mb-3 text-yellow-600 font-semibold'>Select Payment Method:</h1>

      <div className='flex justify-start items-center'>
        {payButtons.map((e) => (
          <div key={e.id} onClick={() => handlePay(e)}>
            <button
              className={`${selectedPayment === e.id && 'shadow-lg shadow-green-500' } hidden md:flex justify-around items-center`}> 
              <img src={e.src} alt={e.name} className='w-[80px]' />
            </button>

            <img src={e.src} alt={e.name} className={`w-[50px] mx-2 md:hidden  ${selectedPayment === e.id && 'shadow-lg shadow-green-500' }`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payments;
