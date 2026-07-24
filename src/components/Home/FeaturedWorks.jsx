import React from 'react'
import { Sparkles } from 'lucide-react'

export default function FeaturedWorks() {
    return (
        <div className="FeatureSection bg-[#4439CC] min-h-[75vh] flex items-center mt-[1.2%]">
      <div className="container  text-white ml-[15%] px-4 py-12">
        <p className="FeatureText1 flex items-center gap-2 text-indigo-200 ">
          <Sparkles className="w-5 h-5" /> Premium Shopping Experience
        </p>
        <h1 className="FeatureHeading text-5xl font-bold  mb-4">
          Shop the future,<br /> delivered today
        </h1>

        <p className="FeatureText2 text-indigo-100 text-lg mb-8">
          Discover premium products at unbeatable prices. Fast<br /> delivery,  easy returns, and exceptional quality.
        </p>
        <div className="container2 flex items-center gap-4">
          <a 
            href="#" 
            className="px-6 py-3 bg-white text-[#4439CC] font-semibold rounded-lg transition-all duration-300 hover:bg-slate-100 hover:shadow-lg active:scale-95 text-center"
          >
            Shop Now
          </a>

          <a 
            href="#" 
            className="px-6 py-3 bg-transparent text-white font-medium rounded-xl border border-white/40 transition-all duration-300 hover:bg-white/10 hover:border-white/80 active:scale-95 text-center"
          >
            View Categories
          </a>
        </div>
      </div>
    </div>
    );
}