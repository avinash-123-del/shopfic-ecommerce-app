import React, { useContext , useState} from 'react';
import { ProductDataContext } from './ContextProvider';
import { toast } from 'react-toastify';

const Offers = () => {

    const { setofferSelected, itemQuantity } = useContext(ProductDataContext)

    const discount = [
        {
            id: 1,
            coupon: 'DIS5',
            details: 'buy atleast 2 produxts & get 5% discount',
            value: 0.05
        },
        {
            id: 2,
            coupon: 'DIS10',
            details: 'buy atleast 5 produxts & get 10% discount',
            value: 0.10
        },
        {
            id: 3,
            coupon: 'DIS20',
            details: 'buy atleast 8 produxts & get 20% discount',
            value: 0.20
        },
    ];

  const [selectedDiscount, setSelectedDiscount] = useState(null);


    function handleOffer(offer) {

        if (itemQuantity <= 1 && (offer.coupon === 'DIS10' || offer.coupon === 'DIS5' || offer.coupon === 'DIS20')) {
            setofferSelected(null)
            toast.error('sorry no offer available')
        }
        
        else if (itemQuantity >= 2 && itemQuantity < 5 && (offer.coupon === 'DIS5')) {
            setofferSelected(offer)
            setSelectedDiscount(offer.id)
            toast.success(`${offer.coupon} applied`)
        }
        
        else if (itemQuantity >= 5 && itemQuantity < 8 && (offer.coupon === 'DIS5' || offer.coupon === 'DIS10')) {
            setofferSelected(offer)
            setSelectedDiscount(offer.id)
            toast.success(`${offer.coupon} applied`)
        }
        
        else if (itemQuantity >= 8 && (offer.coupon === 'DIS5' || offer.coupon === 'DIS10' || offer.coupon === 'DIS20')) {
            setofferSelected(offer)
            setSelectedDiscount(offer.id)
            toast.success(`${offer.coupon} applied`)
        }

        else {
            toast.error('sorry not available')
        }
    }

    return (
        <div>
            <div className='flex flex-col justify-center items-start ml-9 mb-8'>
                <h1 className='font-ubunt text-lg mb-3 text-yellow-600 font-semibold'>Offers available:</h1>

                <div className='flex md:flex-row flex-col justify-between items-center gap-6 md:ml-4'>
                    {discount.map((e) => (
                        <div onClick={() => handleOffer(e)} key={e.id} className={`${selectedDiscount === e.id && 'shadow-inner shadow-green-800'} flex flex-col  px-4 py-2 rounded-md cursor-pointer`}>
                            <span className='font-bold font-ubunt text-sky-700'>{e.coupon}</span>
                            <span className='text-[12px] w-full text-green-600'>{e.details}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Offers;
