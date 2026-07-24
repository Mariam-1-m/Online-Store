import React from 'react'
import { Cable } from 'lucide-react';
import { HouseWifi } from 'lucide-react';
import { Dumbbell } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="ShopSection bg-[#161F32]  flex flex-col items-center justify-center h-[75vh] p-6">

  {/* Header */}
  <div className="container1 text-center mb-12">
    
    <h2 className="ShopHeading2 text-4xl  ">
      How It Works
    </h2>
    <p className="text-slate-500 mt-2 text-lg">Simple steps to get your items delivered</p>
  </div>

  {/* Container2 Categories */}
  <div className="container2 grid grid-cols-1 md:grid-cols-3  w-full max-w-7xl  gap-50 ">

    {/* Group 1 */}
    <div className="ShopCard1 flex flex-col items-center text-center gap-3 p-4">
      <div className="p-4 rounded-40 bg-slate-200/60 mb-2">
        <Cable className="w-12 h-12 text-blue-950" strokeWidth={2} />
      </div>
      <p className="text-2xl font-bold capitalize">Browse Products</p>
      <p className="text-base text-slate-600 ">
        Explore our wide range of premium products
      </p>
    </div>

    {/* Group 2 */}
    <div className="ShopCard2 flex flex-col items-center text-center gap-3 p-4">
      <div className="p-4 rounded-full bg-slate-200/60 mb-2">
        <HouseWifi className="w-12 h-12 text-blue-950" strokeWidth={2} />
      </div>
      <p className="text-2xl font-bold capitalize">Add to Cart</p>
      <p className="text-base text-slate-600 leading-relaxed max-w-xs">
        Select your favorites and add them to your cart
      </p>
    </div>

    {/* Group 3 */}
    <div className="ShopCard3 flex flex-col items-center text-center gap-3 p-4">
      <div className="p-4 rounded-full bg-slate-200/60 mb-2">
        <Dumbbell className="w-12 h-12 text-blue-950" strokeWidth={2} />
      </div>
      <p className="text-2xl font-bold  capitalize">Order & Receive</p>
      <p className="text-base text-slate-600 leading-relaxed max-w-xs">
        Place your order and get it delivered to your doorstep
      </p>
    </div>

  </div>
</div>
  )
}
