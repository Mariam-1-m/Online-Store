import { Link, useNavigate } from "react-router-dom";
import {MoveLeft} from 'lucide-react'
import { useState } from 'react';

function OrderSummaryCard({cartData}) {
  const navigate=useNavigate()
  const [tax,setTax]=useState(cartData.total*0.14)


    return (
     <div className="md:w-full w-full h-auto flex flex-col  justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5 mt-10">
       <h3 className='flex items-center font-bold'>Order Summary</h3>
       
      
       <div className="flex flex-col text-sm gap-1">
         <div className="flex justify-between p-1">
           <p>Subtotal</p>
           <p>EGP {cartData.subtotal}</p>
         </div>
         <div className="flex justify-between p-1 text-green-500">
           <p>Discount </p>
           <p>-EGP {cartData.discountAmount}</p>
         </div>
         <div className="flex justify-between p-1">
           <p>Shipping</p>
           <p>Free</p>
         </div>
       </div>
 <div className="flex justify-between p-1 text-base">
         <p>Tax(14%)</p>
         <p>EGP {Math.floor(tax)}</p>
       </div>
       <hr className="border-slate-200 dark:border-[#23304a]" />

       <div className="flex justify-between p-1 font-bold text-base">
         <p>Total</p>
         <p>EGP {Math.floor(cartData.total+tax)}</p>
       </div>

       
       <button 
         type="submit" 
      
         onClick={()=>navigate('/checkout')} 
         className="w-full h-12 transition duration-100 hover:bg-indigo-500 bg-indigo-700 text-white rounded-md cursor-pointer disabled:bg-indigo-300 font-semibold"
       >
         Proceed to Checkout
       </button>
       <Link to="/products" className="flex items-center gap-2 m-auto  text-indigo-600 text-sm"> <MoveLeft size={16} /> Continue Shopping</Link>
     </div>
    );
}

export default OrderSummaryCard;