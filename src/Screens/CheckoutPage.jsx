import React, { useContext, useEffect, useState } from 'react'
import { ProductDataContext } from '../Components/ContextProvider'
import BillSection from '../Components/BillSection'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Payments from '../Components/Payments'
import Offers from '../Components/Offers'
const CheckoutPage = () => {

    const { input, setInput, paymentMethod, setpaymentMethod,setofferSelected } = useContext(ProductDataContext)

    const [isCountryValid, setisCountryValid] = useState(true)
    // const [isPaymentValid, setisPaymentValid] = useState(true)

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const nav = useNavigate()

    useEffect(() => {
        if (input.country.length === 0 || input.country === 'select country') {
            setisCountryValid(false)
        }
        else {
            setisCountryValid(true)
        }
        setpaymentMethod(undefined)
        setofferSelected(null)
    }, [input.country, setisCountryValid,setpaymentMethod,setofferSelected])

    // useEffect(() => {
    //     if (input.payment.length === 0 || input.payment === 'select payment') {
    //         setisPaymentValid(false)
    //     }
    //     else {
    //         setisPaymentValid(true)
    //     }
    // }, [input.payment, setisPaymentValid])

    const handleSubmit = (e) => {
        e.preventDefault()
    if(input.curtomerName ==='' || input.email ==='' || input.address ==='' || input.country ==='' || input.mobileNum ==='' || input.city ===''  ){
        toast.error('please fill all address details')
    }
    
    else if(paymentMethod === undefined){
        toast.error('please select payment method')
        console.log('payment method',paymentMethod);
    }
    else{
        nav('/shopfic/invoice')
        toast.success('Congratulations! your order has been placed')
    }   
    }

    return (
        <div className='font-poppins lg:text-base text-sm'>

            <div>
                <h3 className='text-lg font-semibold font-ubunt text-start ml-9 text-yellow-600 '>Add Shipping Address:</h3>
            </div>

            <form action="" 
                className='text-center mt-[30px] pl-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around items-center gap-3'>

                <div className='flex flex-col justify-around items-start input '>
                    <label htmlFor="" className='relative font-semibold text-[12px] lg:text-sm mb-2'>NAME <span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <input type="text"
                        name='customerName'
                        required
                        placeholder='customer Name'
                        value={input.customerName}
                        onChange={handleChange} />

                </div>

                <div className='flex flex-col justify-start items-start input'>
                    <label htmlFor="" className='relative font-semibold text-[12px] lg:text-sm mb-2'>EMAIL<span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <input type="email"
                        name='email'
                        // defaultValue={localStorage.getItem('email')}
                        required
                        placeholder='username@example.com'
                        value={input.email}
                        onChange={handleChange} />

                </div>

                <div className='flex flex-col justify-start items-start input'>
                    <label htmlFor="" className='relative font-semibold text-[12px] lg:text-sm mb-2'>MOBILE NO.<span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <input type="text"
                        name='mobileNum'
                        required
                        maxLength="10"
                        placeholder='Mobile Number'
                        value={input.mobileNum}
                        onChange={handleChange} />

                </div>

                <div className='flex flex-col justify-start items-start input'>
                    <label htmlFor="country" className='relative font-semibold text-[12px] lg:text-sm mb-2'>COUNTRY<span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <select name="country" id="country" onChange={handleChange} required className={`${isCountryValid ? 'text-gray-900 ' : 'text-gray-400'}`}>
                        <option value='' className='bg-gray-300'>select country</option>
                        <option value='India' >India</option>
                        <option value='America' >America</option>
                        <option value='Egypt' >Egypt</option>
                    </select>

                </div>

                <div className='flex flex-col justify-start items-start input'>
                    <label htmlFor="" className='relative font-semibold text-[12px] lg:text-sm mb-2'>CITY<span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <input type="text"
                        name='city'
                        required
                        placeholder='City'
                        value={input.city}
                        onChange={handleChange} />
                </div>

                <div className='flex flex-col justify-start items-start input'>
                    <label htmlFor="" className='relative font-semibold text-[12px] lg:text-sm mb-2'>ADDRESS<span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <input type="text"
                        name='address'
                        required
                        placeholder='Address'
                        value={input.address}
                        onChange={handleChange} />

                </div>

                {/* <div className='flex flex-col justify-start items-start input'>
                    <label htmlFor="payment" className='relative font-semibold text-[12px] lg:text-sm mb-2'>PAYMENT<span className='absolute text-red-500 right-[-10px]'>*</span></label>
                    <select name="payment" id="payment" onChange={handleChange} required className={`${isPaymentValid ? 'text-gray-900 ' : 'text-gray-400'}`}>
                        <option value='' className='bg-gray-300'>Payment Terms</option>
                        <option value='UPI ' >UPI</option>
                        <option value='COD' >COD</option>
                        <option value='CARD' >CARD</option>
                        <option value='Paypal' >Paypal</option>
                        <option value='EMI' >EMI</option>
                    </select>

                </div> */}

            </form>
            <br /><br />
            <div>
                <Payments/>
            </div>
            <div>
                <Offers/>
            </div>
            <div className='md:w-[60%] m-auto'>
                <BillSection />
            </div>
            <div className='flex justify-end'>
                <button type='submit' onClick={handleSubmit}
                    className='border-2 focus:outline-none hover:scale-105  duration-200 rounded-md font-poppins text-stone-700 bg-yellow-500 hover:shadow-inner hover:shadow-black font-semibold '
                >Place Order</button>
            </div>
        </div>
    )
}

export default CheckoutPage