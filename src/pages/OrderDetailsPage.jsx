import React, { useState } from 'react';
import { Package, MapPin, CreditCard, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export function OrderDetailPage() {
  const [order] = useState({
    id: "#CC8FC4EE",
    status: "Confirmed",
    steps: [
      { label: "Pending", active: true },
      { label: "Confirmed", active: true },
      { label: "Processing", active: false },
      { label: "Shipped", active: false },
      { label: "Delivered", active: false }
    ],
    items: [
      { id: 1, name: "Item", qty: 1, price: "EGP 54,999" },
      { id: 2, name: "Item", qty: 1, price: "EGP 6,599" },
      { id: 3, name: "Item", qty: 1, price: "EGP 4,999" }
    ],
    shipping: {
      name: "ياسمين ممدوح شرف الدين",
      address: "شارع النخل الرئيسي ( الشارع العام )",
      city: "Syria , مدينة النبك",
      phone: "999999999999"
    },
    payment: {
      method: "Cash",
      total: "EGP 75,920.58",
      date: "Jul 19, 2026"
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Order {order.id}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            {order.status}
          </span>
        </div>

        {/* 1. Order Progress Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-sm font-semibold mb-6 text-slate-700 dark:text-slate-300">Order Progress</h2>
          <div className="relative flex items-center justify-between max-w-2xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 w-1/4 h-0.5 bg-indigo-600 -translate-y-1/2 z-0"></div>

            {order.steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className={step.active 
                  ? "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all bg-indigo-600 border-indigo-600 text-white shadow-md" 
                  : "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400"
                }>
                  {step.active ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
                </div>
                <span className={step.active ? "text-xs mt-2 font-medium text-slate-900 dark:text-white" : "text-xs mt-2 font-medium text-slate-400"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Items List Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm space-y-4">
          <h2 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <Package className="w-4 h-4 text-indigo-500" /> Items
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                    Item
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-slate-400">Qty: {item.qty} × {item.price}</p>
                  </div>
                </div>
                <p className="text-sm font-bold">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Grid Section: Shipping Address & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm space-y-2">
            <h2 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300 mb-3">
              <MapPin className="w-4 h-4 text-indigo-500" /> Shipping Address
            </h2>
            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">{order.shipping.name}</p>
              <p>{order.shipping.address}</p>
              <p>{order.shipping.city}</p>
              <p className="pt-1 text-slate-400">{order.shipping.phone}</p>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm space-y-3">
            <h2 className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <CreditCard className="w-4 h-4 text-indigo-500" /> Payment
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">{order.payment.method}</p>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Total</p>
                <p className="text-xs text-slate-400">Placed on {order.payment.date}</p>
              </div>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{order.payment.total}</p>
            </div>
          </div>
        </div>

        {/* 4. Cancel Order Button */}
        <div className="flex justify-center pt-2">
          <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-xl transition-colors flex items-center gap-2 text-xs shadow-md">
            <AlertCircle className="w-3.5 h-3.5" /> Cancel Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderDetailPage;