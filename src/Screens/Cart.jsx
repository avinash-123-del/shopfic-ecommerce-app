import React, { useContext, useState } from 'react';
import { FaTrashRestoreAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import EmptyCart from '../Components/EmptyCart';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../store/slices/userSlice';
import { ProductDataContext } from '../Components/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const items = useSelector(item => item.user)

  const { setTotalAmount, setitemCard } = useContext(ProductDataContext)

  const [cartItems, setCartItems] = useState([
    ...items
  ]);

  const nav = useNavigate()

  const dispatch = useDispatch()

  const handleRemove = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
    toast.error('Item Removed');
    dispatch(removeItem(product))
  };

  const handleQuantityChange = (product, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const calculateNetPrice = (product) => {
    if (product.quantity === undefined) {

      return product.price
    }
    else {
      return product.price * product.quantity;
    }
  };

  const value = cartItems.map((item) => {
    if (item.quantity === undefined) {
      return item.price
    }
    else {
      return item.price * item.quantity
    }

  })

  const totalAmount = value.reduce((acc, currentValue) => acc + currentValue, 0);
  setTotalAmount(totalAmount)
  setitemCard(cartItems)


  return (
    <div className="">
      {cartItems.length !== 0 ? (
        <div>

          <div className='flex justify-end'>
            <button
              className='border-2 focus:outline-none hover:scale-105  duration-200 rounded-md font-poppins text-stone-700 bg-yellow-500 hover:bg-yellow-600 font-semibold '
              onClick={() => nav('/shopfic/checkout')}>proceed to checkout</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 justify-center w-full">
            {cartItems.map((product) => (
              <div
                className=" my-6 border w-[95%] m-auto py-4 px-2 rounded-md shadow-xl flex flex-col md:flex-row justify-around md:items-center md:gap-4"
                key={product.id}
              >
                <div className="flex justify-center">
                  <img
                    className="md:h-[220px] md:w-[200px] h-[100px] cursor-pointer"
                    src={product.image}
                    alt={product.title}
                  />
                </div>

                <div className="flex flex-col md:gap-3 text-sm md:text-base">
                  <h2 className="font-bold pt-2">{product.title}</h2>
                  <div className="flex justify-between items-center py-2">
                    <p>Category: {product.category}</p>
                    <p>
                      Ratings:{' '}
                      <span className="text-yellow-600 font-bold">
                        {product.rating.rate}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <p className="text-green-800">
                      Price: ${calculateNetPrice(product)}
                    </p>

                    <select
                      className="bg-transparent p-2 focus:outline-none"
                      name="quantity"
                      id="quantity"
                      onChange={(e) =>
                        handleQuantityChange(product, parseInt(e.target.value))
                      }
                      value={product?.quantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>

                    <span className="mr-4 cursor-pointer">
                      <FaTrashRestoreAlt
                        size={30}
                        title="Remove Item"
                        color="#610c04"
                        onClick={() => handleRemove(product)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
