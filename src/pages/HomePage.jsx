// import React from 'react'


import FeaturedWorks from '../components/Home/FeaturedWorks.jsx';
import ShopByCategory from '../components/Home/ShopByCategory.jsx';
import HeroSection from '../components/Home/HeroSection.jsx';

import HowItWorks from '../components/Home/HowItWorks.jsx';
import Subscribtion from '../components/Home/Subscribtion.jsx';


export default function HomePage() {
  return (
    <>
    
        <HeroSection />
        
         <ShopByCategory />
         <HowItWorks />
         <Subscribtion />
        
    </>
  )
}