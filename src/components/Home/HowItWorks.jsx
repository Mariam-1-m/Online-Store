import React from 'react';
import { ShoppingBag, CreditCard, Truck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="dark:bg-[#131b2e] border-slate-200 dark:border-[#23304a] bg-white/80 flex flex-col items-center justify-center min-h-[60vh] py-16 px-6 ">
      
     
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold">
          How It Works
        </h2>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl gap-8">

        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-4 rounded-2xl dark:bg-[#1E244A] bg-slate-300 mb-2 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-semibold capitalize">Browse Products</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Explore our wide range of premium products
          </p>
        </div>

   
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-4 rounded-2xl dark:bg-[#1E244A] bg-slate-300 mb-2 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-semibold capitalize">Add to Cart</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Select your favorites and add them to your cart
          </p>
        </div>

      
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-4 rounded-2xl dark:bg-[#1E244A] bg-slate-300 mb-2 flex items-center justify-center">
            <Truck className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xl text-slate-700 dark:text-slate-300 font-semibold capitalize">Order & Receive</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            Place your order and get it delivered to your doorstep
          </p>
        </div>

      </div>
    </div>
  );
}