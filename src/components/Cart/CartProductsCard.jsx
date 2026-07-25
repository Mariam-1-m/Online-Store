import {Trash2 } from 'lucide-react'
function CartProdutsCard(){
    return(
        <div className="w-full h-auto p-5 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a]  rounded-2xl ">
            <div className="productCard items-center justify-between gap-5 p-5 w-full h-30  flex">
<div className=' rounded-2xl overflow-hidden'>
    <img src="/src/assets/hero.png" className='size-22'/>
</div>
<div className='flex justify-between items-center w-[90%] h-full '>
    <div className='flex flex-col gap-2 h-full '>
        <h3 className='font-bold text-sm'> Modern Floor Lamp</h3>
        <p  className='font-bold text-sm text-indigo-600 '>EGP 79</p>
        <div className='flex gap-3  '>
            <button className='flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700/90 p-2 size-8 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a] rounded-md'>-</button>
            <span className='flex justify-center items-center'>1</span>
            <button className='flex items-center justify-center p-2 size-8 hover:bg-slate-100  dark:hover:bg-slate-700/90 bg-white/80 dark:bg-[#131b2e] border border-slate-200 dark:border-[#23304a]  rounded-md'>+</button>
        </div>
    </div>
    <div className='flex flex-col justify-between items-end h-full  gap-4'>
        <p className='text-slate-400 hover:text-red-500'><Trash2 size={18} /></p>
        <p className='text-right'>EGP 50</p>
    </div>
</div>
            </div>
        </div>
    );
}
export default CartProdutsCard;