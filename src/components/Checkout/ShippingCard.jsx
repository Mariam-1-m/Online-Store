import {MapPin} from 'lucide-react'
function ShippingCard({shippingData,onChange}){




return(
     <div className=" w-full h-auto  flex flex-col justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5">
<h3 className='flex items-center font-bold'><MapPin size={18} className='mr-1 text-indigo-600' /> Shipping Address</h3>
<div className="flex flex-col justify-between gap-4 w-[95%] h-auto ">
<div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
<div className='flex flex-col gap-2 '>
    <label className='block text-xs'>Full Name <span>*</span></label>
    <input type='text' name='fullName' value={shippingData.fullName} required onChange={onChange} className='rounded-md px-3 py-2 border-2 focus:border-indigo-600 w-full  border-slate-200  dark:border-[#23304a] border'/>
</div>

<div className='flex flex-col gap-2 '>
    <label className='block text-xs'>Phone <span>*</span></label>
    <input type='text' name='phone' value={shippingData.phone} required onChange={onChange} className='rounded-md px-3 py-2 border-2 focus:border-indigo-600 w-full  border-slate-200  dark:border-[#23304a] border'/>
</div>
<div className='flex flex-col gap-2 '>
    <label className='block text-xs'>Country <span>*</span></label>
    <input type='text' name='country' value={shippingData.country} required onChange={onChange} className='rounded-md px-3 py-2 border-2 focus:border-indigo-600 w-full  border-slate-200  dark:border-[#23304a] border'/>
</div>
<div className='flex flex-col gap-2 '>
    <label className='block text-xs'>City <span>*</span></label>
    <input type='text' name='city' value={shippingData.city} required onChange={onChange} className='rounded-md px-3 py-2 border-2 focus:border-indigo-600 w-full  border-slate-200  dark:border-[#23304a] border'/>
</div>
</div>
<div className='flex flex-col w-full justify-between gap-4'>


<div className='flex flex-col gap-2 '>
    <label className='block text-xs'>Address <span>*</span> </label>
    <input type='text'name='address' value={shippingData.address} required onChange={onChange} className='rounded-md px-3 py-2 border-2 focus:border-indigo-600 w-full  border-slate-200  dark:border-[#23304a] border'/>
</div>
<div className='flex flex-col gap-2 w-[50%]  '>
    <label className='block text-xs'>Postal Code</label>
    <input type='text' name='postalCode' value={shippingData.postalCode} onChange={onChange} className='rounded-md px-3 py-2 border-2 focus:border-indigo-600 w-full  border-slate-200  dark:border-[#23304a] border'/>
</div>
</div>

</div>
    </div>
);
}
export default ShippingCard;