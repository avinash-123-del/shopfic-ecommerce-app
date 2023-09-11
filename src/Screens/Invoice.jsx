import React, { useContext } from 'react'
import { ProductDataContext } from '../Components/ContextProvider'
import { useNavigate } from 'react-router-dom';
import { TiTick } from 'react-icons/ti'

const Invoice = () => {

  const { totalAmount, itemCard, input, itemQuantity, paymentMethod, offerSelected } = useContext(ProductDataContext)

  const nav = useNavigate()
  return (
    <div>
      <div className='lg:w-[60%] md:w-[80%] m-auto border-2 border-dashed p-4 border-gray-800 md:text-base text-[10px]'>
        {/* <div className='flex justify-between items-start my-8 gap-1'> */}
        <div className='grid grid-cols-2 items-start my-4 md:text-sm lg:text-base '>
          <div>
            <p>Name: <span className='text-gray-700 font-semibold'>{input.customerName}</span></p>
            <p>Mobile No.: <span className='text-gray-700 font-semibold'>{input.mobileNum}</span></p>
            <p>payment: <span className='text-gray-700 font-semibold'>{paymentMethod}</span></p>
            <p>Email: <span className='text-gray-700 font-semibold'>{input.email}</span></p>
          </div>
          <div>
            <p>Country: <span className='text-gray-700 font-semibold'>{input.country}</span></p>
            <p>City: <span className='text-gray-700 font-semibold'>{input.city}</span></p>
            <p>Address: <span className='text-gray-700 font-semibold'>{input.address}</span></p>
          </div>
        </div>

        <div className='w-full bg-gray-800 my-2 h-[1px]'></div>

        <table className='text-center w-full mt-[20px]'>
          <thead>
            <tr>
              <th>S.No</th>
              <th className='text-start'>Products</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {
              itemCard.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className='w-[30%] text-start italic'>{item?.title}</td>
                  <td>{item?.quantity === undefined ? 1 : item.quantity}</td>
                  <td>{item?.price * parseFloat(item?.quantity === undefined ? 1 : item.quantity)}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className='w-full bg-gray-800 my-2 h-[1px]'></div>
        <div className='flex justify-end gap-3 items-center lg:mr-10 xl:mr-16 md:mr-10 font-semibold'>
          <span className='xl:pr-20'>Total Quantity: {itemQuantity}</span>

          {offerSelected !== null ?
            <div className='relative'>
              <span>Total price: <span className='font-ubunt text-yellow-700'>${(totalAmount - totalAmount * offerSelected.value).toFixed(2)}</span> </span>
              <span className='flex justify-center items-center absolute text-green-500 text-[10px] w-[150px] top-5 -right-4'>
                <TiTick color='greeen' size={20} />
                <span >
                  {offerSelected.coupon} discount applied</span>
              </span>
            </div>
            :
            <span>Total Price: <span className='font-ubunt text-yellow-700'>${totalAmount.toFixed(2)}</span></span>
          }
        </div>

        <button className='bg-orange-600 px-2 py-1 rounded-md text-stone-50 font-bold md:text-base text-[10px] hover:bg-orange-700' onClick={() => nav('/home')}>
          shop more
        </button>
      </div>
    </div>
  )
}

export default Invoice