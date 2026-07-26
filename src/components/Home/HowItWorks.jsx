import React from 'react';
import { ShoppingBag, CreditCard, Truck } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="bg-[#161F32] flex flex-col items-center justify-center min-h-[60vh] py-16 px-6 text-white">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          How It Works
        </h2>
      </div>

      {/* Container Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl gap-8">

        {/* Group 1 */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-4 rounded-2xl bg-[#1E244A] mb-2 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xl font-semibold capitalize">Browse Products</p>
          <p className="text-sm text-slate-400 max-w-xs">
            Explore our wide range of premium products
          </p>
        </div>

        {/* Group 2 */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-4 rounded-2xl bg-[#1E244A] mb-2 flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xl font-semibold capitalize">Add to Cart</p>
          <p className="text-sm text-slate-400 max-w-xs">
            Select your favorites and add them to your cart
          </p>
        </div>

        {/* Group 3 */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-4 rounded-2xl bg-[#1E244A] mb-2 flex items-center justify-center">
            <Truck className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-xl font-semibold capitalize">Order & Receive</p>
          <p className="text-sm text-slate-400 max-w-xs">
            Place your order and get it delivered to your doorstep
          </p>
        </div>

      </div>
    </div>
  );
}