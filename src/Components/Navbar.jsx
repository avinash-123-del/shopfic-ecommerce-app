import React, { useContext } from 'react'
import { LiaOpencart } from 'react-icons/lia'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlinePoweroff, AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai'
import { ProductDataContext } from './ContextProvider'
import { toast } from 'react-toastify'
const Navbar = () => {

    const { setisLoggedIn } = useContext(ProductDataContext)
    const CartItems = useSelector((state) => {
        return state.user
    })

    const avtaar = localStorage.getItem('email')

    const handleLogout = () => {
        localStorage.clear()
        toast.success('logged out')
        setisLoggedIn(false)
    }

    const menuItems = [
        {
            id: 1,
            icon: <AiOutlineHome size={20} />,
            name: 'Home',
            link: '/shopfic/home'
        },
        {
            id: 2,
            icon: <AiOutlineShoppingCart size={20} />,
            name: `Cart ${CartItems.length}`,
            link: '/shopfic/cart'
        },
        {
            id: 3,
            icon: <AiOutlinePoweroff size={20} onClick={handleLogout} />,
            name: 'LogOut',
            link: '/'
        },
    ]

    return (
        <div className='shadow-lg py-3 px-6 md:px-[50px] flex justify-between items-center w-screen '>

            <div className='flex items-center font-lilita justify-start'>
                <Link to='/home'><h1 className='text-[30px] font-bold'>Shopfic </h1></Link>
                <span><LiaOpencart color='green' size={50} /></span>
            </div>

            <div className='hidden sm:flex justify-center gap-6 items-center '>
                {menuItems.map((item) => (
                    <Link key={item.id} to={item.link}>
                        <div className='flex justify-center gap-1 items-center'>
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </div>
                    </Link>
                ))}
                <h3 className='px-2 py-[2px] rounded-full text-stone-100 border-2 border-orange-700 bg-gray-800'>{avtaar.substr(0, 1).toUpperCase()}</h3>

            </div>


            <div className='relative sm:hidden'>

                <ul className='sm:hidden flex justify-between items-center gap-4'>
                    <li><Link to='/shopfic/home'><AiOutlineHome size={20} color='green' /></Link></li>
                    <li className='relative'><Link to='/shopfic/cart'><AiOutlineShoppingCart size={20} color='green' />
                        <span className='absolute top-[-7px] right-[-5px] bg-red-700 px-1 text-[10px] text-stone-100 rounded-full'>{CartItems.length}</span>
                    </Link></li>
                    <li><Link to='/'><AiOutlinePoweroff size={20} color='green' onClick={handleLogout} /></Link></li>
                    <h3 className='px-2 py-[2px] rounded-full text-stone-100 border-2 border-orange-700 bg-gray-800'>{avtaar ? avtaar.substr(0, 1).toUpperCase() : ''}</h3>

                </ul>
            </div>


        </div>
    )
}

export default Navbar