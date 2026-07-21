import { CreditCard } from "lucide-react"

function PaymentMethodeCard(){
return(
    <div className=" w-full h-auto  flex flex-col justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5">
<h3 className="flex items-center gap-1"><CreditCard size={18} className="text-indigo-600  font-bold" />Payment Method</h3>
<div className="w-[98%] h-20  flex items-center p-4 border border-indigo-600 dark:border-indigo-500 dark:bg-slate-800/90 bg-indigo-50 rounded-xl">

    <div className="flex gap-5">

  <div className="rounded-full flex justify-center items-center   bg-blue-100 size-10">
<CreditCard size={18} className="m-auto text-indigo-600"/>
  </div>

  <div className="flex flex-col justify-around">
<h4 className="font-bold">Cash on Delivery</h4>
<p className="text-xs">Pay when you receive your order</p>
  </div>


    <div/>
</div>
</div>
    </div>
)
}
export default PaymentMethodeCard