import {Tag} from 'lucide-react'
function CouponCard(){
    return(
        <div className="w-full h-32 p-5 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a]  rounded-2xl ">
            <h3 className='flex items-center gap-2'><Tag size={16} />Coupon Code</h3>
            <div className='flex items-center justify-between gap-5 my-3 '>
                <input type='text' placeholder='Enter coupon code' className='w-[90%] py-2 px-5 bg-white/80 dark:bg-[#0a0e17] focus:border-2  focus:border-indigo-600  rounded-xl border border-slate-200 dark:border-[#23304a]  '/>
                <button className='border border-indigo-600 text-indigo-600 hover:bg-slate-100/50 dark:hover:bg-slate-700/90 rounded-xl px-5 py-2'>Apply</button>
            </div>
        </div>
    );
}
export default CouponCard