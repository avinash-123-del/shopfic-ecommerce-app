import React, { useContext, useState } from 'react'
import { ProductDataContext } from './ContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const LoginForm = () => {

    const [loginBtn, setLoginbtn] = useState(false)
    const BASE_URL = 'https://shopfic-e-app.onrender.com'
    const { setAuth, setisLoggedIn } = useContext(ProductDataContext)

    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        setLoginData(prev => { return { ...prev, [e.target.name]: e.target.value } })
    }

    const nav = useNavigate()
    const hanldeSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoginbtn(true)
            const data = await axios.post(`${BASE_URL}/login`, loginData)
                .then(data => data)
            if (data?.data?.status === 200) {
                toast.success('logged in')
                setisLoggedIn(true)
                localStorage.setItem('email', loginData.email)
                nav('/shopfic/home')
            }
            if (data?.data?.status === 501) {
                toast.error('password not matched')
            }
            if (data?.data?.status === 401) {
                toast.error('Invalid Credentials please signup')
            }
            setLoginbtn(false)
        } catch (error) {
            console.log('error in login', error);
        } finally {
            setLoginbtn(false)
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

                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-[40%] md:w-[20%] sm:w-auto px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {loginBtn ?
                        <div className='relative'>
                            <svg aria-hidden="true" role="status" className="absolute top-1 left-2 w-4 h-4 text-gray-200 animate-spin dark:text-stone-200" viewBox="0 0 100 101" fill="black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="green" />
                            </svg> 
                            <span  className='pl-6'>please wait</span>
                            </div>
                            : 'Login'}</button>
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