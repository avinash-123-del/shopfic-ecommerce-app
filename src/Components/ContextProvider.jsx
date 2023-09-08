// Create a context for the product data
import { createContext, useEffect,useState } from 'react';

export const ProductDataContext = createContext();

export function ProductDataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [itemCard, setitemCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [addFav, setAddFav] = useState()
  const [totalAmount , setTotalAmount] = useState()

  const [input, setInput] = useState({ customerName: '', email: '', mobileNum: '', country: '', address: '', city: '', payment: '' })


  const fetchProducts = () => {
    // Fetch products and set the state
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(); // Fetch data when the component mounts
  }, []);

  const value = {
    products,
    loading,setLoading,addFav, setAddFav,auth, setAuth,isLoggedIn,itemCard, setitemCard, totalAmount , setTotalAmount,
    setisLoggedIn,input, setInput,
    fetchProducts, // You can expose the fetch function if needed
  };

  return (
    <ProductDataContext.Provider value={value}>
      {children}
    </ProductDataContext.Provider>
  );
}
