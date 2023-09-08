import React, { useContext, useState } from 'react'
import { ProductDataContext } from './ContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const LoginForm = () => {
    
    const BASE_URL = 'https://shopfic-e-app.onrender.com'
    const { setAuth, setisLoggedIn } = useContext(ProductDataContext)

    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setLoginData(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const nav = useNavigate()
    const hanldeSubmit = async (e) => {
        e.preventDefault()
        const data = await axios.post(`${BASE_URL}/login`, loginData)
            .then(data => data)
        console.log(data);
        if (data?.data?.status === 200) {
            toast.success('logged in')
            setisLoggedIn(true)
            localStorage.setItem('email', loginData.email)
            nav('/home')
        }
        console.log('status', data?.data?.status);
        if (data?.data?.status === 501) {
            toast.error('password not matched')
        }
        if (data?.data?.status === 401) {
            toast.error('Invalid Credentials please signup')
        }
    }

    return (
        <div>

            <form className='' onSubmit={hanldeSubmit}>
                <div className="mb-6 ">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                    <input type="email" id="email" name='email' onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="youremail@gmail.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" id="password" name='password' onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                </div>

                <div className='flex justify-start items-center py-4'>

                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
                    <p >please <span className='italic text-blue-600 cursor-pointer' onClick={() => setAuth(false)}>signup</span> to register</p>
                </div>

                <div className='flex justify-between items-center'>
                    <img className='md:w-[200px] xl:w-[200px] lg:w-[150px] w-[150px]' src="/gril.png" alt="" />
                    <img className='md:w-[300px] xl:w-[300px] lg:w-[200px] w-[200px]' src="/boy.png" alt="" />
                </div>
            </form>
        </div>
    )
}

export default LoginForm