import { useEffect, useState } from "react"
import api from "../../lib/api"
import Loader from "../Loader";
import { DeleteIcon, ShoppingBasket } from "lucide-react";
import toast from "react-hot-toast";

export default function WishListComponent(){
    const [wishlistData, setWishlistData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const[addtocartloading,setaddtocartloading]=useState(false)
    const fetchWishlist=async()=>{
            try {
                const response=await api.get("/wishlists/my");
                setWishlistData(response.data.wishlist.products)
            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        } 
    useEffect(()=>{
        fetchWishlist();
    },[])
    console.log(wishlistData)

    const deleteItemFromWishlist=async(productId)=>{
        try{            
            const response =await api.delete(`/wishlists/remove/${productId}`)
            console.log("product deleted from wishlist succsess")
            toast.success("product Deleted From Wishlist Successfully!")
            fetchWishlist();
        }catch(err){
            console.log(err)
        }
    }

    const addProductToCart=async(productId)=>{
        try{
            setaddtocartloading(true)
            const response=await api.post("/carts/items",{
                productId:productId,
                quantity:1
            })
            console.log(response.data)
            toast.success("product added to cart Successfully")
        }catch(err){
            console.log(err)
        }finally{
            setaddtocartloading(false)
        }
    }
    if(loading){
        return <Loader/>
    }
    return (
        <>
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">My Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistData?.map((pro,inx)=>{
                    return (
                        <div key={inx} className="bg-white dark:bg-[#12162f] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <img src={pro.images?.[0].url} alt="ProductImage" className="w-full h-80" />
                            <div className="p-4">
                                <h3 className="text-md font-medium text-slate-800 dark:text-white line-clamp-2 mb-2 hover:text-[#4f13f3] cursor-pointer">{pro.name}</h3>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-md font-bold text-[#4f13f3]">EGP {pro.discountPrice}</span>
                                    <span className="text-md font-bold text-gray-400 line-through">EGP {pro.price}</span>
                                </div>
                                
                                <div className="flex gap-2 mt-2">
                                    <button onClick={()=>{addProductToCart(pro._id)}} className="flex-1 py-2 bg-[#4f13f3] text-white text-sm font-medium rounded-lg hover:bg-brand-700 flex items-center justify-center gap-2 disabled:opacity-50"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart w-4 h-4" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg> Add To Cart</button>
                                    <button onClick={()=>{deleteItemFromWishlist(pro._id)}} className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 lucide-trash-2 w-4 h-4" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
                                </div>
                            </div>
                            

                        </div>
                    )
                })}
                
            </div>
        </div>
        </>
    )
}