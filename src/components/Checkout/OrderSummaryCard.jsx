

function OrderSummaryCard({ orderData, loading, errorMessage, handlePlaceOrder }) {
    return (
     <div className="md:w-full w-full h-auto flex flex-col justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5 mt-13">
       <h3 className='flex items-center font-bold'>Order Summary</h3>
       
       <div className="w-full h-auto flex flex-col gap-2 max-h-48 overflow-y-auto">
         {orderData?.items?.map((item, index) => (
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
           <p>EGP {orderData?.subtotal ?? "0.00"}</p>
         </div>
         <div className="flex justify-between p-1 text-green-500">
           <p>Discount {orderData?.coupon ? `(${orderData.coupon})` : ''}</p>
           <p>-EGP {orderData?.discountAmount ?? "0.00"}</p>
         </div>
         <div className="flex justify-between p-1">
           <p>Shipping</p>
           <p>Calculated at checkout</p>
         </div>
       </div>

       <hr className="border-slate-200 dark:border-[#23304a]" />

       <div className="flex justify-between p-1 font-bold text-base">
         <p>Total</p>
         <p>EGP {orderData?.total ?? "0.00"}</p>
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