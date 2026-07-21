import { useNavigate,useParams } from 'react-router-dom';
import {Package,ShoppingBasket,CircleCheckBig } from 'lucide-react'

function OrderSuccessSection(){
const navigate=useNavigate()
const {orderId}=useParams()
return(
    <section className="w-full h-[70vh]   flex justify-center items-center dark:bg-[#0b0f19] bg-white/70">
    <div className="content flex flex-col gap-4  items-center w-[60%] p-5 ">
  <div className=' bg-green-100 rounded-full size-16 flex items-center justify-center'>
<CircleCheckBig size={30} strokeWidth={3} className='text-green-500 font-bold  '/>
  </div>
  <h2 className='font-bold text-2xl text-center'>Order Placed Successfully!</h2>
  <p className='text-sm text-center'>Thank you for your purchase. Your order has been confirmed.</p>
  <p className='text-xs text-center'>Order ID: <span className='text-indigo-600'>#{orderId?.slice(-8).toUpperCase()}</span></p>
  <div className='flex flex-col md:flex-row gap-3'>
    <button onClick={()=>{navigate(`/orders/${orderId}`)}} className='flex gap-2 border items-center text-indigo-600 border-indigo-600 px-5 py-3 rounded-xl'><Package />Track My Order</button>
    <button onClick={()=>{navigate("/products")}} className='flex gap-2 bg-indigo-600 text-white  items-center  px-5 py-3 rounded-xl'><ShoppingBasket />Continue Shopping</button>
  </div>
    </div>
    </section>
);

}
export default OrderSuccessSection;