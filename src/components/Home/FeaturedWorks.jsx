import React from 'react'
import { Sparkles } from 'lucide-react'

export default function FeaturedWorks() {
    return (
        <div className="FeatureSection   bg-[#4439CC]  min-h-screen  ">
            <div className="container pl-15  pt-30 w-[50%] text-white">
                <p className='FeatureText1' > <Sparkles className="inline-block mr-2" /> Premium Shopping Experience</p>
                <h1 className='Featureأeading  heading'  >Shop the future, delivered today</h1>
                <p className='FeatureText2' >Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.</p>

                <button className='bg-white text-[#4439CC]  '><a href="">Shop Now
                </a></button>
                <button className='bg-[#4439CC]     border-white   rounded-lg'><a href="">View Categories</a></button>
            </div>
            {/*ُ End FeatureSection  */}
        </div>
    );
}