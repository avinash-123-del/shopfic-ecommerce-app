import React, { useContext } from 'react'
import { ProductDataContext } from '../Components/ContextProvider'
import { useNavigate } from 'react-router-dom';

const Invoice = () => {

    const {totalAmount , itemCard , input} = useContext(ProductDataContext)

    const nav = useNavigate()
  return (
    <div>
        <div className='lg:w-[60%] w-[80%] m-auto border-2 border-dashed p-4 border-gray-800 md:text-base text-[10px] '>
        <div className='flex justify-between items-start my-8'>
        <div>
          <p>Customer Name: <span className='text-gray-700 font-semibold'>{input.customerName}</span></p>
          <p>Email: <span className='text-gray-700 font-semibold'>{input.email}</span></p>
          <p>Mobile No.: <span className='text-gray-700 font-semibold'>{input.mobileNum}</span></p>
        </div>
        <div>
          <p>Country: <span className='text-gray-700 font-semibold'>{input.country}</span></p>
          <p>City: <span className='text-gray-700 font-semibold'>{input.city}</span></p>
          <p>Payment: <span className='text-gray-700 font-semibold'>{input.payment}</span></p>
        </div>
      </div>

      <div className='w-full bg-gray-800 my-2 h-[1px]'></div>

      <table className='text-center w-full mt-[20px]'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Products</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
         {
             itemCard.map((item , index) => (
                 <tr key={index}>
                    <td>{index+1}</td>
                    <td className='w-[30%] text-start'>{item?.title}</td>
                    <td>{item?.quantity === undefined ? 1 : item.quantity}</td>
                    <td>{item?.price * parseFloat(item?.quantity === undefined ? 1 : item.quantity)}</td>
                </tr>
            ))
         }
        </tbody>
      </table>
      <div className='w-full bg-gray-800 my-2 h-[1px]'></div>
<div className='flex justify-end items-center lg:mr-8 xl:mr-14 font-semibold'>
    Total Price: ${totalAmount.toFixed(2)}
</div>

<button className='bg-orange-600 px-2 py-1 rounded-md text-stone-50 font-bold md:text-base text-[10px] hover:bg-orange-700' onClick={() =>nav('/home') }>
    shop more
</button>
    </div>
    </div>
  )
}

export default Invoice