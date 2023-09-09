import React, { useContext } from 'react'
import { ProductDataContext } from '../Components/ContextProvider'
import { Outlet, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const AppScreen = () => {

    const { isLoggedIn } = useContext(ProductDataContext)

    if (!isLoggedIn) {

        toast.error('please Login')
        return <Navigate to={'/'} />
    }
    else {
        return <Outlet />
    }
}

export default AppScreen