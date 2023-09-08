import React, { useContext, useEffect } from 'react'
import LoginForm from '../Components/LoginForm'
import { LiaOpencart } from 'react-icons/lia'
import { ProductDataContext } from '../Components/ContextProvider'
import SignupForm from '../Components/SignupForm'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

  const {auth,setisLoggedIn}  = useContext(ProductDataContext)
  const nav = useNavigate()
  useEffect(() => {
    const email = localStorage.getItem('email')
    if(email){
      nav('/home')
      setisLoggedIn(true)
    }
  },[nav , setisLoggedIn])


  return (
    <div className='lg:flex justify-around items-start relative h-screen overflow-hidden pt-5'>

      <div className='flex flex-col justify-center items-start z-10 lg:pl-20 text-sm pl-2 lg:w-[70%] xl:w-full'>
        <div className='flex items-center font-lilita justify-start w-[480px] '>
          <h1 className='text-[30px] font-bold'>Shopfic </h1>
          <span><LiaOpencart color='green' size={50} /></span>
          <h3 className='px-5 pt-5'>Fashion for Every Occasion</h3>
        </div>

        <div className='mt-[100px] w-[75%] hidden lg:inline'>
          <h1 className='lg:text-4xl xl:text-6xl sm:text-2xl md:text-3xl  font-poppins font-semibold'>Your <span className='text-orange-600 '>Ultimate Ecommerce</span>  App with <span className='text-green-500'>Pocket Buget</span> </h1>
          <p className='pt-10 md:hidden lg:inline-block text-sm'>Shopific revolutionizes online shopping with a seamless mobile experience. Browse a vast catalog of products, enjoy personalized recommendations, and benefit from secure, one-click purchases. With fast delivery and 24/7 customer support, Shopific simplifies your shopping journey, making it your go-to destination for all your shopping needs.</p>
        </div>
      </div>

      <div className='lg:w-full w-screen sm:w-screen m-auto mt-[50px]  lg:mt-[100px] mr-20 px-4 shadow-lg'>
       {auth ? <LoginForm /> : <SignupForm/>} 
        
      </div>
      
      <span className='animate-trolly absolute bottom-[50px] md:bottom-0 left-0 w-screen z-10'>
        <img className='md:w-[200px] w-[100px] ' src="/trolly.png" alt="" />
      </span>


    </div>
  )
}

export default LoginPage