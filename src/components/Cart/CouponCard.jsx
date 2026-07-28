import {Tag,X} from 'lucide-react'
import {  useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

function CouponCard(){

const [couponValue,setCouponValue]=useState("")
const [applied,setApplied]=useState(false);
    const {applyCoupon,removeCoupon,coupon}=useContext(CartContext)
    const handleApply = async (e) => {
        e.preventDefault(); 
        if (!couponValue.trim()) return;
        
        try {
            await applyCoupon(couponValue);
            setApplied(true);
            setCouponValue(""); 
        } catch (error) {
            console.log(error.message);
        }
    };

const handleDelete=()=>{
    removeCoupon();
    setApplied(false);
}

    return(
        <div className="w-full flex flex-col justify-between gap-3 h-auto p-5 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a]  rounded-2xl ">
            <h3 className='flex items-center gap-2'><Tag size={16} />Coupon Code</h3>
            {(!applied && coupon===null)?<form   onSubmit={handleApply} className='flex items-center justify-between gap-5 my-3 '>
                <input type='text' value={couponValue} onChange={(e)=>setCouponValue(e.target.value)} placeholder='Enter coupon code' className='w-[90%] py-2 px-5 bg-white/80 dark:bg-[#0a0e17] focus:border-2  focus:border-indigo-600  rounded-xl border border-slate-200 dark:border-[#23304a]  '/>
                <button type="submit" className='border border-indigo-600 text-indigo-600 hover:bg-slate-100/50 dark:hover:bg-slate-700/90 rounded-xl px-5 py-2'>Apply</button>
                
            </form>:
            <div className='rounded-md flex justify-between  border border-green-300 w-full h-auto px-4 py-3 bg-green-100 text-green-600'>
                <p className=' '>Coupon <span className='text-sm'>"{coupon}"</span> applied!</p>
                <button onClick={handleDelete}><X size={16} className='text-red-300 hover:text-red-500'/></button>
                </div>}
        </div>
    );
}
export default CouponCard