import { MapPin } from 'lucide-react';

export default function OrderShippingCard({ shippingAddress }) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] w-[48%] h-auto rounded-2xl p-6 backdrop-blur-sm space-y-2">
      <h2 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-3">
        <MapPin className="w-4 h-4 text-indigo-500" /> Shipping Address
      </h2>
      <div className="text-sm space-y-1 text-slate-600 dark:text-slate-300">
                <p className="font-semibold text-slate-400 dark:text-white">{shippingAddress.fullName.toUpperCase()}</p>

                <p className="font-semibold text-slate-400 dark:text-white">{shippingAddress.address.toUpperCase()}</p>
        <p className="font-semibold text-slate-400 dark:text-white">{shippingAddress.city.toUpperCase()}, {shippingAddress.country.toUpperCase()}</p>
       
        <p className="pt-1 text-slate-400">{shippingAddress.phone}</p>
      </div>
    </div>
  );
}