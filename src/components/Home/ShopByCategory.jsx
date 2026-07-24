import React from 'react'
import { Cable } from 'lucide-react';
import { HouseWifi } from 'lucide-react';
import { Dumbbell } from 'lucide-react';
export default function ShopByCategory() {
  return (
    <div className="ShopSection bg-slate-950 flex flex-col items-center justify-center  min-h-screen">

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


      {/*  */}
      <div className="container3 w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-emerald-700 p-6 rounded-2xl">
          
        <div className="ShopCard1   h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">
          <div>
            <button></button>
            </div>{/*  */}

          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}

        </div>{/*  */}

        <div className="ShopCard2 h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">
            <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}
        </div>

        <div className="ShopCard3 h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">

          <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}
        </div>

        <div className="ShopCard4  h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">

            <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}

        </div>

        <div className="ShopCard5  h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">

            <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}

        </div>

        <div className="ShopCard6   h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">
            <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}
        </div>

        <div className="ShopCard7   h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">
          <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}

        </div>

        <div className="ShopCard8   h-full bg-slate-300 rounded-2xl flex flex-col items-center justify-center gap-1">
          <div>
            <button></button>
            </div>{/*  */}
            
          <div><a href=""><img
            src="image source"
            class="img-fluid rounded-top"
            alt=""
          /></a>
          </div>{/*  */}
          
          <div>{/*  */}
            <p></p>
            <p></p>
            <button></button>
            </div>{/*  */}
        </div>

      </div>

    </div>
  )
}
