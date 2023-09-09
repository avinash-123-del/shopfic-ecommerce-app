import React, { useContext } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Screens/Home'
import Cart from './Screens/Cart'
import CheckoutPage from './Screens/CheckoutPage'
import Invoice from './Screens/Invoice'
import LoginPage from './Screens/LoginPage'
import { ProductDataContext } from './Components/ContextProvider'
import AppScreen from './AppScreen/AppScreen'
import ProductDetailPage from './Screens/ProductDetailPage'
const App = () => {
  const { isLoggedIn } = useContext(ProductDataContext)
  return (
    <div >
      {(isLoggedIn || localStorage.getItem('email'))  && <Navbar />}
      <Routes >
        <Route path='/' element={<LoginPage />} />
        <Route path='/shopfic' element={<AppScreen />} >
          <Route path='home' element={<div className='mt-10 w-[95%] m-auto'><Home /></div>} />
          <Route path='home/product/:id' element={<div className='mt-10 w-[95%] m-auto'><ProductDetailPage /></div>} />
          <Route path='cart' element={<div className='mt-10 w-[95%] m-auto'><Cart /></div>} />
          <Route path='checkout' element={<div className='mt-10 w-[95%] m-auto'><CheckoutPage /></div>} />
          <Route path='invoice' element={<div className='mt-10 w-[95%] m-auto'><Invoice /></div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App