import React, { useContext } from 'react'
import './index.css'
import Home from './Screens/Home'
import { Routes, Route } from 'react-router-dom'
import Cart from './Screens/Cart'
import Navbar from './Components/Navbar'
import LoginPage from './Screens/LoginPage'
import SignupForm from './Components/SignupForm'
import { ProductDataContext } from './Components/ContextProvider'
const App = () => {
  const { isLoggedIn } = useContext(ProductDataContext)
  return (
    <div >
      {isLoggedIn && <Navbar />}
      <Routes >
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/home' element={<div className='mt-10 w-[95%] m-auto'><Home /></div>} />
        <Route path='/cart' element={<div className='mt-10 w-[95%] m-auto'><Cart /></div>} />

      </Routes>

    </div>
  )
}

export default App