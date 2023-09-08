import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const BillSection = () => {

    const cartItems = useSelector(state => state.user)
    const [order , setOrder] = useState(false)

    let total = 0
    cartItems.map(e => total += parseFloat(e.price))

    function handleOrder(){
        toast.success('order placed')
        setOrder(true)
    }

    return (
        <div className='border-2 border-gray-900 rounded-lg shadow-lg p-2 text-sm md:text-base mb-4'>
            <h1 className='text-lg  font-bold text-green-600'>Your Cart Summary:</h1>
            <div className='h-[1px] bg-gray-800 w-full'></div>
            <div className='mt-5'>
                {cartItems.map((item) => (
                    <div className='flex justify-between items-center'>
                        <span className='italic'>{item.title.substr(0, 25) + '...'}</span>
                        <span>${item.price}</span>  
                    </div>
                ))}
                <div className='h-[1px] bg-gray-800 w-full my-3'></div>
                <div className='flex justify-between items-center'>
                    <p className='my-3'>Total Items: {cartItems.length}</p>
                    <p className='font-bold'>Total Amount: ${total.toFixed(2)}</p>
                </div>
            <div className='flex justify-end'>
                <button
                 className='border-2 focus:outline-none hover:scale-105  duration-200 rounded-md font-poppins text-stone-700 bg-yellow-500 hover:bg-yellow-600 font-semibold '
                 onClick={() => handleOrder() }>{order ? 'Order Placed' : 'Place Order'}</button>
            </div>
            </div>
        </div>
    )
}

export default BillSection