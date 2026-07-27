import {Tag} from 'lucide-react'
import {  useState } from 'react';
import api from '../../lib/api';


function CouponCard({onUpdate }){

const [couponValue,setCouponValue]=useState("")
    const applyCoupon=async(couponCode)=>{
        try{
    const response=await api.post("/carts/coupon",{
        code:couponCode
    })
    console.log("Coupon added successfully",response.data);
    setCouponValue("");
        }catch(e){
 console.log(e.message);
        }
    }


    return(
        <div className="w-full h-32 p-5 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a]  rounded-2xl ">
            <h3 className='flex items-center gap-2'><Tag size={16} />Coupon Code</h3>
            <form className='flex items-center justify-between gap-5 my-3 '>
                <input type='text' value={couponValue} onChange={(e)=>setCouponValue(e.target.value)} placeholder='Enter coupon code' className='w-[90%] py-2 px-5 bg-white/80 dark:bg-[#0a0e17] focus:border-2  focus:border-indigo-600  rounded-xl border border-slate-200 dark:border-[#23304a]  '/>
                <button onClick={()=>{applyCoupon(couponValue);
                }} className='border border-indigo-600 text-indigo-600 hover:bg-slate-100/50 dark:hover:bg-slate-700/90 rounded-xl px-5 py-2'>Apply</button>
            </form>
        </div>
    );
}
export default CouponCard