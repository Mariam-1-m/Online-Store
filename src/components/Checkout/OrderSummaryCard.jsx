import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


function OrderSummaryCard({  loading, errorMessage, handlePlaceOrder }) {
  const {cartItems,subtotal,total,discountAmount,shipping,coupon,tax}=useContext(CartContext);
 const compuedTotal=Math.floor(total + (shipping === "Free" ? 0 : shipping)+(tax||0)) || "0.00"
    return (
     <div className="md:w-full w-full h-auto flex flex-col justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5 mt-13">
       <h3 className='flex items-center font-bold'>Order Summary</h3>
       
       <div className="w-full h-auto flex flex-col gap-2 max-h-48 overflow-y-auto">
         {cartItems?.map((item, index) => (
           <div key={index} className="card flex justify-between p-2 items-center w-full">
             <div className="flex justify-between gap-3 items-center">
               <div>
                 <img src={item.image || "/src/assets/hero.png"} className="size-10 object-cover rounded" alt={item.name} />
               </div>
               <div className="flex flex-col gap-0.5">
                 <h4 className="text-sm font-medium">{item.name}</h4>
                 <p className="text-xs text-gray-500">x{item.quantity}</p>
               </div>
             </div>
             <div>
               <p className="text-sm font-semibold">EGP {item.price * item.quantity}</p>
             </div>
           </div>
         )) || (
           <p className="text-xs text-gray-400 p-2">Loading cart items...</p>
         )}
       </div>

       <hr className="border-slate-200 dark:border-[#23304a]" />

       <div className="flex flex-col text-sm gap-1">
         <div className="flex justify-between p-1">
           <p>Subtotal</p>
           <p>EGP {subtotal||"00.0"}</p>
         </div>
         {(discountAmount!==0) && <div className="flex justify-between p-1 text-green-500">
           <p>Discount <span className="text-xs">"{coupon || ""}"</span> </p>
           <p>-EGP {discountAmount}</p>
         </div>}
       
         <div className="flex justify-between p-1">
           <p>Shipping</p>
           <p>{shipping}</p>
         </div>
          <div className="flex justify-between p-1 text-base">
         <p>Tax(14%)</p>
         <p>EGP {Math.floor(tax)}</p>
       </div>
       </div>

       <hr className="border-slate-200 dark:border-[#23304a]" />

       <div className="flex justify-between p-1 font-bold text-base">
         <p>Total</p>
         <p>EGP {compuedTotal}</p>
       </div>

       {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
       
       <button 
         type="submit" 
         disabled={loading} 
         onClick={handlePlaceOrder} 
         className="w-full h-12 transition duration-100 hover:bg-indigo-500 bg-indigo-700 text-white rounded-md cursor-pointer disabled:bg-indigo-300 font-semibold"
       >
         {loading ? "Processing Order.." : "Place Order"}
       </button>
     </div>
    );
}

export default OrderSummaryCard;