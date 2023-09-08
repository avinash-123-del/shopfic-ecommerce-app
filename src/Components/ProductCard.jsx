import React from 'react'
import '../index.css'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { useDispatch,useSelector } from 'react-redux'
import { addItem, removeItem } from '../store/slices/userSlice'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {

    const dispatch = useDispatch()

    const cartItem = useSelector(state => state.user)

   function handleAddItem(){
    dispatch(addItem(product))
    toast.success('Added to cart')
}

function handleRemoveItem(){
    dispatch(removeItem(product))
    toast.error('Removed from cart')
   }


    return (
        <div key={product.id} className="text-sm w-[300px] my-6 border py-4 px-2 rounded-md shadow-xl hover:scale-110 overflow-hidden duration-200">
            <div className='flex justify-center'>
                <img className='h-[220px] w-[200px] cursor-pointer'
                    src={product.image} alt={product.title} />
            </div>
            <h2 className='font-bold pt-2'>{product.title.substr(0, 40)}</h2>
            <div className='flex justify-between items-center py-2'>
                <p>Category: {product.category}</p>
                <p>Ratings: <span className='text-yellow-600 font-bold'>{product.rating.rate}</span></p>
            </div>
            <div className='flex justify-between items-center font-semibold'>
                <p className='text-green-800'>Price: ${product.price}</p>
                <div className='cursor-pointer'>
                    {cartItem.some((p) => p.id === product.id) ?
                        <AiTwotoneHeart size={25} color='#D2042D' onClick={() =>handleRemoveItem()} /> :
                        <AiOutlineHeart size={25} color='#D2042D' onClick={() =>handleAddItem()} />
                    }
                </div>
            </div>
        </div>

    )
}

export default ProductCard