import { CreditCard } from 'lucide-react';

export default function OrderPaymentCard({ paymentMethode,total,creationDate }) {
  return (
    <div className="bg-white/80 w-[48%] h-auto dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm space-y-3">
      <h2 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <CreditCard className="w-4 h-4 text-indigo-500" /> Payment
      </h2>
      <p className=" text-slate-600 dark:text-slate-300">{paymentMethode}</p>
      <div className="border-t border-slate-100 dark:border-slate-800 pt-3  ">
        <div className='flex justify-between items-center mb-2'>
          <p className="  text-slate-700 font-bold">Total</p>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">EGP {total}</p>

        </div>
                  <p className="text-xs text-slate-400">Placed on {creationDate}</p>

      </div>
    </div>
  );
}