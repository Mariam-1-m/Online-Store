import { FileText } from "lucide-react"

function OrderNotesCard(){
    return(
      <div className=" w-full h-auto  flex flex-col justify-between dark:bg-[#131b2e] gap-3 rounded-xl border border-slate-200 dark:border-[#23304a] bg-white/80 p-5">
<h3 className="flex items-center gap-1"><FileText size={18} className="text-indigo-600  font-bold" />Order Notes (Optional)</h3>
<div className="w-[98%] h-20 flex items-center p-4 border border-indigo-600 dark:border-indigo-500 dark:bg-slate-800/90 bg-indigo-50 rounded-xl">
  
  <div className="w-full">
    <textarea className="w-full h-full outline-0 p-0 text-sm" placeholder="Any special instructions for your order..." />
  </div>
</div>
    </div>
    );
}

export default OrderNotesCard;