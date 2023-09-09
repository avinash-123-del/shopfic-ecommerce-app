import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductDataContext } from '../Components/ContextProvider'
import { BsFillCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addItem } from '../store/slices/userSlice'

const ProductDetailPage = () => {

    const { id } = useParams()

    const { products } = useContext(ProductDataContext)
    const item = products.find((e) => e.id === parseInt(id))
    // console.log(item);
    const nav = useNavigate()
    const dispatch = useDispatch()

    const cartItem = useSelector(state => state.user)

    const alreadyInCart = cartItem.some((e) => e.id === item.id)

    function handleCart() {
        toast.success(`${item.title.substr(0, 10)}... added to cart}`)
        dispatch(addItem(item))
    }

    return (
        <div className='flex lg:flex-row flex-col justify-between items-center lg:w-[80%] w-[95%] m-auto gap-10'>
            <div className='lg:shadow-xl shadow-lg p-8 shadow-gray-800 overflow-hidden rounded-md'>
                <img src={item?.image} alt="" className='lg:w-[300px] w-[200px] hover:scale-110 cursor-pointer duration-200 ease-in-out' />
            </div>

            <div className='lg:w-[70%] flex flex-col justify-start items-start gap-4'>
                <h1 className='font-bold text-xl'>{item?.title}</h1>
                <h1 className='font-lilita'> Category --&gt; {item?.category}</h1>
                <div className='lg:w-[90%] font-semibold text-sm text-gray-700 flex justify-between gap-4'>
                    <span>Description</span>
                    <h1 className=''> {item?.description}</h1>
                </div>

                <div className='flex justify-around items-center gap-6'>
                    <h1 className='font-bold '> Ratings {item?.rating?.rate} / 5</h1>
                    <span className='text-gray-500'>Reviews {item?.rating?.count}</span>
                </div>
                <div className='relative'>
                    <h1 className='font-lilita'> special price <span className='font-bold font-poppins text-yellow-500 text-xl'> {item?.price}$</span> </h1>
                    <span>
                        <strike className='text-gray-500 absolute text-sm right-[-20px]'>{(item?.price + item?.price * 0.1).toFixed(2)}$</strike>
                        <span className='text-green-600'>10% off</span>
                    </span>
                </div>
                <div className='  w-full m-auto font-semibold text-stone-50'>
                    <button className=' py-4 items-center text-[18px] shadow-yellow-800 rounded-md shadow-inner bg-gradient-to-r from-yellow-500 to-yellow-400'>
                        {alreadyInCart ?
                            <span onClick={() => nav('/shopfic/cart')} className='flex justify-center items-center gap-3'><BsFillCartFill /> Go to cart</span> :
                            <span onClick={handleCart} className='flex justify-center items-center gap-3'><BsFillCartFill /> Add to cart</span>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage