import React, { useState, useEffect, useCallback, useContext } from 'react';
import { BiFilterAlt } from 'react-icons/bi'
import { LiaOpencart } from 'react-icons/lia'
import '../App.css'
import ProductCard from '../Components/ProductCard';
import { ProductDataContext } from '../Components/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function App() {

    const [filterMenu, setfilterMenu] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [filters, setFilters] = useState({
        priceRange: [0, 1000], // Default price range
        ratingsRange: [0, 5], // Default ratings range
        category: '',
    });


    const { products, loading, setLoading } = useContext(ProductDataContext)

    // Function to filter products
    const nav = useNavigate()
    useEffect(() => {
        const userEmail = localStorage.getItem('email')
        console.log(userEmail);
        if (userEmail === null) {
            toast.warn('please login')
                nav('/')
        }
    }, [nav])

    const filterProducts = useCallback(() => {
        const [minPrice, maxPrice] = filters.priceRange;
        const [minRatings, maxRatings] = filters.ratingsRange;

        setLoading(true);

        const filtered = products.filter(
            (product) =>
                product.price >= minPrice &&
                product.price <= maxPrice &&
                product.rating.rate >= minRatings &&
                product.rating.rate <= maxRatings &&
                (filters.category === '' || product.category === filters.category)
        );

        setLoading(false);

        setFilteredProducts(filtered);
    }, [filters, products, setLoading]);

    useEffect(() => {
        filterProducts();
    }, [filterProducts]);

    return (
        <>
        
        {loading ? <div className='flex flex-col justify-center items-center mt-[250px]'>
        <div className="sm:w-20 sm:h-20 w-8 h-8 rounded-full animate-spin 
        border-x-8 border-solid border-red-800 border-t-transparent m-auto"></div>
        <span className='text-2xl text-center mt-3'>Loading...</span>
        </div> : 

        <div className='relative '>
            <button onClick={() => setfilterMenu(!filterMenu)}
                className='px-2 py-1 rounded-md flex  items-center gap-1 font-semibold bg-gray-200 border-dashed border-2'><BiFilterAlt /><span>Filter</span></button>



            <div className={`text-sm absolute left-0 bg-gray-100 w-[300px] duration-500 py-6 px-4 flex flex-col gap-8
            ${filterMenu ? 'translate-x-0 ' : 'translate-x-[-350px]'}`}>
                <div>
                    <label className='italic'
                        htmlFor="priceRange">Price Range:</label>
                    <div className='flex justify-start gap-3 pt-2 items-center'>
                        <input className='appearance-none w-40 h-1 bg-gray-900 rounded-lg range'
                            type="range"
                            id="priceRange"
                            min="0"
                            max="1000"
                            step="100"
                            value={filters.priceRange[0]}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    priceRange: [e.target.value, filters.priceRange[1]],
                                })
                            }
                        />
                        <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                    </div>
                </div>
                <div>
                    <label className='italic'
                        htmlFor="ratingsRange">Ratings Range:</label>

                    <div className='flex justify-start gap-3 pt-2 items-center'>
                        <input className='appearance-none w-40 h-1 bg-gray-900 rounded-lg range'
                            type="range"
                            id="ratingsRange"
                            min="0"
                            max="5"
                            step="1"
                            value={filters.ratingsRange[0]}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    ratingsRange: [e.target.value, filters.ratingsRange[1]],
                                })
                            }
                        />
                        <span>{filters.ratingsRange[0]} - {filters.ratingsRange[1]}</span>
                    </div>
                </div>
                <div className='flex justify-start gap-10 items-center'>
                    <label className='italic'
                        htmlFor="category">Category:</label>
                    <select
                        className='bg-transparent font-semibold focus:outline-none w-fit text-sm'
                        id="category"
                        value={filters.category}
                        onChange={(e) =>
                            setFilters({ ...filters, category: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="jewelery">Jewelry</option>
                        <option value="electronics">Electronics</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </div>
            </div>


            {/* <button onClick={filterProducts}>Apply Filters</button> */}

            {filteredProducts.length === 0 ? (
                <div className='flex justify-center items-center text-xl font-bold font-exo h-[50vh] '>
                    <div className='flex justify-between items-center shadow-inner p-4 bg-stone-200 shadow-black rounded-md'>
                        <h2 className='px-2'>No product found </h2>
                        <span className='animate-leftRight'><LiaOpencart size={40} color='green' /></span>
                    </div>


                </div>
            ) : (
                <div className="grid ml-[40px] sm:ml-[60px] sm:grid-cols-1 col-span-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
               ">
                    {filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            )}
        </div>
        }
</>
    );
}


export default App;
