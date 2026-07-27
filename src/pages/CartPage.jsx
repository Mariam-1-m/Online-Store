import {MoveLeft ,ShoppingCart} from 'lucide-react'
import { Link } from "react-router-dom";
import OrderSummaryCard from '../components/Cart/OrderSummaryCard';
import CouponCard from '../components/Cart/CouponCard';
import CartProductsCards from '../components/Cart/CartProductsCard'
import { useEffect, useState } from 'react';
import api from '../lib/api';
import Loader from '../components/Loader';


function CartPage(){

const [cartProducts,setCardProducts]=useState([]);
const [cartData,setCartData]=useState({})
const [loading,setLoading]=useState(false)


const fetchCartProducts = async () => {
    try {
        setLoading(true);
        const cart = await api.get("/carts");
        console.log(cart);
        setCartData(cart.data)
        setCardProducts(cart.data.items);
    } catch (error) {
        console.log(error.message);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    const loadCartProducts = async () => {
        await fetchCartProducts();
    };

    loadCartProducts();
}, []);

return (
    <div>
        {loading ? (
            <Loader />
        ) : cartProducts.length !== 0 ? (
            <div className='p-8'>
                <h2 className='font-bold text-3xl'>Shopping Cart</h2>
                <div className='flex flex-col md:flex-row  md:gap-2 justify-between  '>
                    <div className='flex flex-col w-full md:w-[65%] gap-6 mt-10 md:mb-10'>
                        <CartProductsCards cartProducts={cartProducts} setCartProducts={setCardProducts} 
                            onUpdate={fetchCartProducts} />
                        <CouponCard onUpdate={fetchCartProducts} />
                    </div>
                    <div className='w-full md:w-[32%] mb-5'>
                        <OrderSummaryCard cartData={cartData} />
                    </div>
                </div>
                <Link to='/products' className='flex items-center gap-2 hover:text-shadow-2xs text-indigo-600'>
                    <MoveLeft size={16} /> Continue Shopping
                </Link>
            </div>
        ) : (
            <div className=' h-110 flex flex-col gap-4 justify-center items-center bg-islate-50'>
                <div className='rounded-full size-20 flex justify-center items-center bg-slate-200'><ShoppingCart className="text-slate-400" size={40} /></div>
                <h2 className='font-bold text-xl'>Your Cart is Empty</h2>
                <p className='w-110 text-center'>Looks like you haven't added anything to your cart yet. Start shopping and find something you love!</p>
                <Link  to="/products" className='bg-indigo-500 rounded-2xl px-5 py-3 text-white'>Start Shopping</Link>
            </div>
        )}
    </div>
);
}
export default CartPage;