import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { ProductDataContext } from './ContextProvider'
import { TiTick } from 'react-icons/ti'


const BillSection = () => {

    const { totalAmount, itemCard, itemQuantity, offerSelected } = useContext(ProductDataContext)

    const cartItems = useSelector(state => state.user)

    let total = 0
    cartItems.map(e => total += parseFloat(e.price))

    return (
        <div className=' rounded-lg shadow-lg p-2 text-[12px] lg:text-base mb-4'>
            <h1 className='text-lg  font-bold text-green-600'>Your Cart Summary:</h1>
            <div className='h-[1.5px] bg-gray-800 w-full'></div>
            <div className='mt-5'>
                <table className='w-full '>
                    <thead >
                        <tr className=''>
                            <th className='text-start pl-10'>Products</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>

                    </thead>
                    <tbody className='border-[1px] border-x-0 border-gray-800 '>
                        {
                            cartItems.map((item, index) => (
                                <tr key={index} className=''>
                                    <td className='italic w-[50%] px-10 overflow-hidden py-2'>{item.title.substr(0, 25) + '...'}</td>
                                    <td className=' text-center'>{itemCard[index]?.quantity === undefined ? 1 : itemCard[index]?.quantity}</td>
                                    <td className='font-semibold text-center'>${item.price * parseFloat(itemCard[index]?.quantity === undefined ? 1 : itemCard[index]?.quantity)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <div className='flex justify-end gap-3 items-center mr-3 md:mr-8 xl:mr-14 py-2'>
                    <span className='xl:pr-24'>Total Quantity: {itemQuantity}</span>

                    {offerSelected !== null ?
                        <div className='relative'>
                            <span>Total price: <span className='font-ubunt text-yellow-700'>${(totalAmount - totalAmount * offerSelected.value).toFixed(2)}</span></span>
                            <span className='flex justify-center items-center absolute text-green-500 text-[10px] w-[150px] top-5 -right-2'>
                                <TiTick color='greeen' size={20} />
                                <span >
                                    {offerSelected.coupon} discount applied</span>
                            </span>
                        </div>
                        :
                        <span>Total Price: <span className='font-ubunt text-yellow-700'>${totalAmount.toFixed(2)}</span></span>
                    }
                </div>
                <div className='h-[1px] bg-gray-800 w-full my-3'></div>

            </div>
        </div>
    )
}

export default BillSection