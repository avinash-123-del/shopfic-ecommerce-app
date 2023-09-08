import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrashRestoreAlt } from 'react-icons/fa'
import { removeItem } from '../store/slices/userSlice'
import { toast } from 'react-toastify'
import EmptyCart from '../Components/EmptyCart'
import BillSection from '../Components/BillSection'

const Cart = () => {

  const cartItems = useSelector((state) => { return state.user })

  const dispatch = useDispatch()

  function handleRemove(product) {
    dispatch(removeItem(product))
    toast.error('Item Removed')
  }
  console.log(cartItems);
  return (
    <div className=''>

      {cartItems.length !== 0 ?
        <div className='flex md:flex-row flex-col justify-evenly items-center relative'>
          <div className='grid grid-cols-1 justify-center mx-5 w-full'>
            {cartItems.map((product) => (
              <div className=" my-6 border md:w-[60%] py-4 px-2 rounded-md shadow-xl flex flex-col md:flex-row justify-around md:items-center md:gap-4">
                <div className='flex justify-center'>
                  <img className='md:h-[220px] md:w-[200px] h-[100px] cursor-pointer'
                    src={product.image} alt={product.title} />
                </div>

                <div className='flex flex-col md:gap-3 text-sm md:text-base'>

                  <h2 className='font-bold pt-2'>{product.title}</h2>
                  <div className='flex justify-between items-center py-2'>
                    <p>Category: {product.category}</p>
                    <p>Ratings: <span className='text-yellow-600 font-bold'>{product.rating.rate}</span></p>
                  </div>
                  <div className='flex justify-between items-center font-semibold'>
                    <p className='text-green-800'>Price: ${product.price}</p>
                    <span className='mr-4 cursor-pointer'>

                      <FaTrashRestoreAlt size={30} title='Remove Item' color='#610c04' onClick={() => handleRemove(product)} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='md:w-[40%] w-[90%] md:absolute top-0 right-0'><BillSection /></div>
        </div>

        : <EmptyCart />}
    </div>

  )
}

export default Cart