import { Cable, HouseWifi, Dumbbell, Heart, Star, ShoppingCart } from "lucide-react";

export default function ShopSection() {
  return (
    <div className="ShopSection bg-slate-950 flex flex-col items-center justify-center min-h-screen gap-8 py-10">

      {/* Header */}
      <div className="container1 text-center text-white">
        <h2 className="ShopHeading2 text-3xl font-bold">Shop by Category</h2>
        <p className="ShopText2 text-slate-400">Browse our wide range of categories</p>
      </div>

      {/* Container2 Categories */}
      <div className="container2 w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-amber-500 p-6 rounded-2xl">

        <div className="ShopCard1 h-40 bg-[#1E293B] rounded-2xl flex flex-col items-center justify-center gap-1 text-white">
          <Cable strokeWidth={1.5} />
          <p>electronics</p>
          <p className="text-sm text-slate-400">5 products</p>
        </div>

        <div className="ShopCard2 h-40 bg-[#1E293B] rounded-2xl flex flex-col items-center justify-center gap-1 text-white">
          <HouseWifi />
          <p>home</p>
          <p className="text-sm text-slate-400">4 products</p>
        </div>

        <div className="ShopCard3 h-40 bg-[#1E293B] rounded-2xl flex flex-col items-center justify-center gap-1 text-white">
          <Dumbbell />
          <p>sports</p>
          <p className="text-sm text-slate-400">2 products</p>
        </div>

        <div className="ShopCard4 h-40 bg-[#1E293B] rounded-2xl flex flex-col items-center justify-center gap-1 text-white">
          <Cable strokeWidth={1.5} />
          <p>fashion</p>
          <p className="text-sm text-slate-400">1 products</p>
        </div>

        <div className="ShopCard5 h-40 bg-[#1E293B] rounded-2xl flex flex-col items-center justify-center gap-1 text-white">
          <Cable strokeWidth={1.5} />
          <p>phones</p>
          <p className="text-sm text-slate-400">1 product</p>
        </div>

      </div>

      {/* Container3 Products */}
      <div className="container3 w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-emerald-700 p-6 rounded-2xl">

        {/* ShopCard1 - CeraVe Moisturizing Cream */}
        <div className="ShopCard1 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Beauty
          </div>
          <div className="absolute top-2 right-12 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -30%
          </div>
          <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="CeraVe Moisturizing Cream"
              />
            </a>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">CeraVe Moisturizing Cream</p>
            <p className="text-xs text-amber-500">★★★☆☆ (2)</p>
            <p className="font-bold text-indigo-400">
              EGP 50 <span className="text-xs text-slate-400 line-through font-normal">EGP 200</span>
            </p>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* ShopCard2 - Modern Floor Lamp */}
        <div className="ShopCard2 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Home
          </div>
          <div className="absolute top-2 right-12 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -17%
          </div>
          <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="Modern Floor Lamp"
              />
            </a>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">Modern Floor Lamp</p>
            <p className="text-xs text-amber-500">★★★★☆ (1)</p>
            <p className="font-bold text-indigo-400">
              EGP 79 <span className="text-xs text-slate-400 line-through font-normal">EGP 95</span>
            </p>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* ShopCard3 - Air Fryer XL */}
        <div className="ShopCard3 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Home
          </div>
          <div className="absolute top-2 right-12 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -33%
          </div>
          <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="Air Fryer XL"
              />
            </a>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">Air Fryer XL</p>
            <p className="text-xs text-slate-400">☆☆☆☆☆ (0)</p>
            <p className="font-bold text-indigo-400">
              EGP 139 <span className="text-xs text-slate-400 line-through font-normal">EGP 169</span>
            </p>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

        <div className="ShopCard4 relative h-full rounded-2xl flex flex-col overflow-hidden">
          
         
          <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Home
          </div>
          <div className="absolute top-2 right-12 z-10 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -33%
          </div>
          <button className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="relative w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="Wooden Table"
              />
            </a>
            <span className="absolute px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-bold">
              Out of Stock
            </span>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">Wooden Table</p>
            <p className="text-xs text-slate-400">☆☆☆☆☆ (0)</p>
            <p className="font-bold text-indigo-400">
              EGP 186 <span className="text-xs text-slate-400 line-through font-normal">EGP 220</span>
            </p>
            <button disabled className="mt-1 bg-slate-400 text-white text-sm py-1.5 rounded-lg cursor-not-allowed flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Out of Stock
            </button>
          </div>
        </div>

        {/* ShopCard5 - Nike Air Max 270 White */}
        <div className="ShopCard5 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Sports
          </div>
          <div className="absolute top-2 right-12 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -17%
          </div>
          <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="Nike Air Max 270 White"
              />
            </a>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">Nike Air Max 270 White</p>
            <p className="text-xs text-amber-500">★★★★★ (5)</p>
            <p className="font-bold text-indigo-400">
              EGP 1,899 <span className="text-xs text-slate-400 line-through font-normal">EGP 2,299</span>
            </p>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* ShopCard6 - Nike Air Max (Out of Stock) */}
        <div className="ShopCard6 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Sports
          </div>
          <div className="absolute top-2 right-12 z-10 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -33%
          </div>
          <button className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="relative w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="Nike Air Max"
              />
            </a>
            <span className="absolute px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-bold">
               Out of Stock
            </span>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">Nike Air Max</p>
            <p className="text-xs text-slate-400">☆☆☆☆☆ (0)</p>
            <p className="font-bold text-indigo-400">EGP 1,699</p>
            <button disabled className="mt-1 bg-slate-400 text-white text-sm py-1.5 rounded-lg cursor-not-allowed flex items-center justify-center gap-1">
               <ShoppingCart size={14} /> Out of Stock
            </button>
          </div>
        </div>

        {/* ShopCard7 - MacBook Air M3 */}
        <div className="ShopCard7 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Electronics
          </div>
          <div className="absolute top-2 right-12 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            -7%
          </div>
          <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="MacBook Air M3"
              />
            </a>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">MacBook Air M3</p>
            <p className="text-xs text-amber-500">★★★★★ (12)</p>
            <p className="font-bold text-indigo-400">
              EGP 54,999 <span className="text-xs text-slate-400 line-through font-normal">EGP 58,999</span>
            </p>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* ShopCard8 - Samsung Galaxy S25 Ultra */}
        <div className="ShopCard8 relative h-full rounded-2xl flex flex-col overflow-hidden">
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-xl">
            Phones
          </div>
          <button className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5">
            <Heart size={16} />
          </button>

          <div className="w-full bg-slate-100 flex items-center justify-center p-4" style={{ height: "130px" }}>
            <a href="">
              <img
                src="image source"
                className="max-h-full max-w-full object-contain"
                alt="Samsung Galaxy S25 Ultra"
              />
            </a>
          </div>

          <div className="flex flex-col gap-1 p-3 bg-[#1E293B] h-full text-white">
            <p className="font-medium text-sm">Samsung Galaxy S25 Ultra</p>
            <p className="text-xs text-amber-500">★★★★★ (8)</p>
            <p className="font-bold text-indigo-400">EGP 42,500</p>
            <button className="mt-1 bg-indigo-600 text-white text-sm py-1.5 rounded-lg flex items-center justify-center gap-1">
              <ShoppingCart size={14} /> Add to Cart
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}