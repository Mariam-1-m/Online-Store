import {MoveLeft } from 'lucide-react'
import { Link } from "react-router-dom";
import OrderSummaryCard from '../components/Cart/OrderSummaryCard';
import CouponCard from '../components/Cart/CouponCard';
import CartProductsCards from '../components/Cart/CartProductsCard'

function CartPage(){
return(
<div className='p-8'>
    <h2 className='font-bold text-3xl'>Shopping Cart</h2>
    <div className='flex flex-col md:flex-row  md:gap-2 justify-between  '>
        <div className='flex flex-col w-full md:w-[65%] gap-6 mt-10 md:mb-10'>
        <CartProductsCards/>
        <CouponCard/>
        </div>
       <div className='w-full md:w-[32%] mb-5'>
         <OrderSummaryCard/>
       </div>
  
    </div>
    <Link to='/products' className='flex items-center gap-2 hover:text-shadow-2xs text-indigo-600'><MoveLeft size={16}/> Continue Shopping</Link>
</div>

);
}
export default CartPage;