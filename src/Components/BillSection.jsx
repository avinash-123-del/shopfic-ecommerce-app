import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ProductDataContext } from './ContextProvider'

const BillSection = () => {

    const {totalAmount , itemCard} = useContext(ProductDataContext)
    const cartItems = useSelector(state => state.user)
    let total = 0
    cartItems.map(e => total += parseFloat(e.price))

    return (
        <div className=' rounded-lg shadow-lg p-2 text-sm md:text-base mb-4'>
            <h1 className='text-lg  font-bold text-green-600'>Your Cart Summary:</h1>
            <div className='h-[1px] bg-gray-800 w-full'></div>
            <div className='mt-5'>
                <table className='w-full'>
                    <thead >
                        <tr className='flex  justify-between items-center'>
                            <th>Products</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>

                    </thead>
                    <tbody>

                        <div className='h-[1px] bg-gray-800 w-full my-3'></div>
                        {
                            cartItems.map((item, index) => (
                                <tr key={index} className='flex  justify-between items-center'>
                                    <td className='italic w-[35%] overflow-hidden text-sm'>{item.title.substr(0, 25) + '...'}</td>
                                    <td className='text-end pr-14'>{itemCard[index]?.quantity === undefined ? 1 : itemCard[index]?.quantity}</td>
                                    <td className='font-semibold'>${item.price * parseFloat(itemCard[index]?.quantity === undefined ? 1 : itemCard[index]?.quantity)}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
                <div className='h-[1px] bg-gray-800 w-full my-3'></div>
                <div className='flex justify-between items-center'>
                    <p className='my-3'>Total Items: {cartItems.length}</p>
                    <p className='font-bold'>Total Amount: ${totalAmount.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default BillSection