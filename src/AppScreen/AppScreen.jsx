import React, { useContext } from 'react'
import { ProductDataContext } from '../Components/ContextProvider'
import { Outlet, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const AppScreen = () => {

//Protecting Routes

    const { isLoggedIn } = useContext(ProductDataContext)

    if (!isLoggedIn && (!localStorage.getItem('email'))) {
        toast.error('please Login')
        return <Navigate to={'/'} />
    }
    else {
        return <Outlet />
    }
}

export default AppScreen