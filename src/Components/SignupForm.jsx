import React, { useContext, useState } from 'react'
import { ProductDataContext } from './ContextProvider'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignupForm = () => {

  const { setAuth } = useContext(ProductDataContext)

  const [registerData, setregisterData] = useState({ email: '', password: '', confirmPassword: '' })

  const handleChange = (e) => {
    setregisterData(prev => { return { ...prev, [e.target.name]: e.target.value } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(registerData.password === registerData.confirmPassword){
      try {
        await axios.post('http://localhost:5000/signup',  registerData )
        .then(auth => setAuth(true))
        console.log('user registered');
      } catch (error) {
        console.log('error in registeration', error);
      }
    } 
    else{
      toast.error('Password not matched')
    }
  }
  return (
    <div>
      <form className='' onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
          <input type="email" id="email" name='email' onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="youremail@gmail.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
          <input type="password" id="password" name='password' onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
          <input type="password" id="password" name='confirmPassword' onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>

        <div className='flex justify-start items-center py-4'>

          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Signup</button>
          <p >Already have an account, please <span className='italic text-blue-600 cursor-pointer z-40' onClick={() => setAuth(true)}>Login</span></p>
        </div>

        <div className='flex justify-between items-center'>
                    <img className='md:w-[200px] xl:w-[200px] lg:w-[150px] w-[150px] ' src="/gril.png" alt="" />
                    <img className='md:w-[300px] xl:w-[300px] lg:w-[200px] w-[200px] ' src="/boy.png" alt="" />
                </div> 
      </form>

    </div>
  )
}

export default SignupForm