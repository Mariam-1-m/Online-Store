
function OrderSummaryCard(){
    return(
     <div className="md:w-full w-full h-auto  flex flex-col justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5 mt-13">
    <h3 className='flex items-center font-bold'> Order Summary</h3>
  <div className="w-full h-auto ">

   <div className="card flex justify-between p-3 h-18 w-full">
    <div className="flex justify-between gap-5">
    <div>
    <img src="/src/assets/hero.png" className="size-10"/>
   </div>
   <div className="flex flex-col gap-1">
    <h4 className="text-sm">samsung s26 ultra</h4>
    <p className="text-sm">x2</p>
   </div>
   </div>
   <div>
    <p className="text-sm">EGP 6,000</p>
   </div>
   
   </div>

  </div>
  <hr/>
  <div className="flex flex-col">
      <div className="flex justify-between p-1">
    <p>Subtotal</p>
    <p>EGP 9,277</p>
  </div>
    <div className="flex justify-between p-1 text-green-500">
    <p>Discount</p>
    <p>-EGP 927.7</p>
  </div>
    <div className="flex justify-between p-1">
    <p>Shipping</p>
    <p>Free</p>
  </div>
    <div className="flex justify-between p-1">
    <p>Tax (14%)</p>
    <p>EGP 1,169</p>
  </div>
  </div>
<hr/>
  <div className="flex justify-between p-1">
    <p>Total</p>
    <p>EGP 9,518.3</p>
  </div>
  <button className="w-full h-12 transition duration-100 hover:bg-indigo-500 bg-indigo-700 text-white rounded-md">Place Order</button>
    </div>
    );

}
export default OrderSummaryCard;