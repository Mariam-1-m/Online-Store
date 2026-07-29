import { Package } from 'lucide-react';

export default function OrderItemCards({ items }) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm space-y-4">
      <h2 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <Package className="w-4 h-4 text-indigo-500" /> Items
      </h2>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((item) => (
          <div key={item.product} className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                Item
              </div>
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-slate-400">Qty: {item.quantity} × {item.price}</p>
              </div>
            </div>
            <p className="text-sm font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}