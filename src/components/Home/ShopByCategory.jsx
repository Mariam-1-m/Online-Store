import React from "react";
import { Zap, HouseWifi, Dumbbell, Shirt, Smartphone } from "lucide-react";

export default function ShopByCategory({ products }) {
  const categories = [
    { name: "electronics", count: 0, Icon: Zap },
    { name: "home", count: 0, Icon: HouseWifi },
    { name: "sports", count: 0, Icon: Dumbbell },
    { name: "fashion", count: 0, Icon: Shirt },
    { name: "phones", count: 0, Icon: Smartphone },
  ];

  products.forEach(function (product) {
    categories.forEach(function (cat) {
      if (product.category === cat.name) {
        cat.count = cat.count + 1;
      }
    });
  });

  return (
    <div className="w-full flex flex-col items-center gap-8 py-8">
   
      <div className="text-center ">
        <h2 className="text-3xl font-bold">Shop by Category</h2>
        <p className="text-slate-400">Browse our wide range of categories</p>
      </div>


      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
        {categories.map(function (cat, index) {
          const CategoryIcon = cat.Icon;
          return (
            <div
              key={index}
              className="group h-48 hover:shadow-xl dark:bg-[#131b2e] border-slate-200 dark:border-[#23304a] bg-white/80 rounded-2xl flex flex-col items-center justify-center gap-2  border-2  transition-colors hover:border-indigo-400 p-4"
            >
              <div className="rounded-xl p-3 mb-1 transition-colors bg-indigo-500/20 group-hover:bg-slate-200">
                <CategoryIcon
                  strokeWidth={1.5}
                  className="transition-colors text-indigo-400 group-hover:text-indigo-600"
                  size={28}
                />
              </div>
              <p className="font-semibold capitalize text-lg">{cat.name}</p>
              <p className="text-sm text-slate-400">{cat.count} products</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}