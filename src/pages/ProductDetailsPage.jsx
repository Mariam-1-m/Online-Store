import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../lib/api";
import {
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
} from "lucide-react";

function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("description");
    const [rating, setRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [review, setReview] = useState("");

    useEffect(() => {
        const getProduct = async () => {
        try {
         const response = await api.get(`/products/${id}`);
         setProduct(response.data.product);
          console.log(response.data.product);
       } catch (error) {
          console.log(error);
       } finally {
         setLoading(false);
      }
      };
     getProduct();
   }, [id]);

   useEffect(() => {
     const getRelatedProducts = async () => {
       try {
         const response = await api.get("/products?page=1&limit=20");
         const products = response.data.products.filter(
           (p) => p._id !== id
         );
         const shuffled = products.sort(() => 0.5 - Math.random());
         setRelatedProducts(shuffled.slice(0, 2));
        } catch (error) {
          console.log(error);
       }
     };
     getRelatedProducts();
   }, [id]);

   const handleAddToCart = async () => {
     try {
        await api.post("/carts/items", {
         productId: product._id,
         quantity,
       });
       alert("Product added to cart");
     } catch (error) {
       console.log(error.response?.data);
       alert("Error");
     }
    };

   const handleAddToWishlist = async () => {
      try {
       await api.post(`/wishlist/add/${product._id}`);
       alert("Added to wishlist");
     } catch (error) {
        console.log(error);
        alert("Failed");
     }
   };
   
   const handleSubmitReview = async () => {
     if (rating === 0) {
       alert("Please select rating");
       return;
      }
     try {
        await api.post(`/products/${product._id}/reviews`, {
         rating,
         comment: review,
       });
        alert("Review submitted successfully");
     } catch (error) {
       console.log(error.response?.data);
     }
   };
// .............
   const handleAddToCartItem = async (productId) => {
      try {
       await api.post("/carts/items", {
          productId,
          quantity: 1,
       });
       alert("Added")
      } catch (error) {
       console.log(error.response?.data);
     }
   };

   const handleWishlistItem = async (productId) => {
      try {
       await api.post(`/wishlist/add/${productId}`);
       alert("Added to wishlist")
     } catch (error) {
       console.log(error.response?.data);
     }
   };
    if (loading) {
     return <h2 className="text-center mt-10">Loading...</h2>;
    }
  return (
    <section className="min-h-screen bg-[var(--background)] py-10">
      <div className="mx-auto max-w-7xl px-5">
         <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left Side */}
             <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-6">
                 <div className="flex h-[450px] items-center justify-center rounded-xl bg-[var(--background)] overflow-hidden">
                     <img    src={product?.images?.[0]?.url}    alt="Product"   className="h-[420px] w-full object-contain transition-all duration-300"/>
                 </div>
             </div>
              {/* Right Side */}
             <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-8">
                 <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-sky-500"> {product?.brand}</span>
                     <span className="text-gray-400"> {product?.category}  </span>
                 </div>
                 <h1 className="text-4xl font-bold leading-none text-[var(--text-primary)]"> {product?.name}   </h1>
                 <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                             <Star  key={star}  size={18}
                                className={ star <= Math.round(product?.averageRating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300" } />
                             ))}
                      </div>     
                      <span className="text-sm text-gray-400">  ({product?.numReviews}) </span>
                     <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">   {product?.stock>0? "in Stock" : "Out of Stock"} </span>   
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                      <span className="text-4xl font-bold text-blue-600"> EGP {product?.price} </span>
                      <span className="text-xl text-gray-400 line-through">  EGP{product?.discountPrice}</span>
                     <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">   -{Math.round( ((product?.price - product?.discountPrice) / product?.price) * 100 )} % </span>
                  </div>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                         <div className="flex items-center rounded-lg border border-gray-300">
                            <button className="p-3" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)) }>
                              <Minus size={18} />
                            </button>
                            <span className="w-12 text-center font-semibold"> {quantity} </span>
                           <button className="p-3" onClick={() => setQuantity((prev) => prev + 1)}>
                             <Plus size={18} />
                           </button>
                         </div>
                         <button onClick={handleAddToCart} className="flex flex-1 h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
                           <ShoppingCart size={20} />  Add to Cart
                         </button>
                         <button onClick={handleAddToWishlist} className="rounded-xl border border-gray-300 p-3 transition hover:bg-red-100">
                           <Heart className="text-gray-500 hover:fill-red-500 hover:text-red-500" size={22} />
                         </button>
                       </div>
                       <p className="mt-4 leading-8 max-w-md text-gray-500">  {product?.description}  </p>
                </div>
          </div>
      </div>

     <div className="mx-auto mt-10 w-[80%] rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-8">
         {/* Tabs */}
         <div className="flex gap-8 border-b border-[var(--border-main)]">
             <button
                 onClick={() => setActiveTab("description")}
                  className={`pb-3 text-lg font-medium transition ${
                     activeTab === "description"
                     ? "border-b-2 border-blue-600 text-blue-600"
                     : "text-gray-500"
                    }`} >  Description 
                </button>
              <button
                 onClick={() => setActiveTab("reviews")}
                  className={`pb-3 text-lg font-medium transition ${
                      activeTab === "reviews"
                     ? "border-b-2 border-blue-600 text-blue-600"
                     : "text-gray-500"
                   }`} >  Reviews ({product?.numReviews})
             </button>
         </div>
             {/* Description */}
         {activeTab === "description" && (
              <div className="mt-6">
                   <p className="max-w-3xl leading-8 text-gray-500"> {product?.description}  </p>
              </div>
           )}
             {/* Reviews */}
         {activeTab === "reviews" && (
             <div className="mt-6">
                  <h3 className="mb-4 text-2xl font-semibold">  Write a Review </h3>
                  <div className="mb-4 flex gap-1">
                     {[1, 2, 3, 4, 5].map((star) => (
                         <Star
                              key={star}
                              size={22}
                               onClick={() => setRating(star)}
                               className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                                 star <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-400"
                              }`}/>
                     ))}
                 </div>
                <textarea rows={5} value={review} onChange={(e) => setReview(e.target.value)} placeholder="Share your thoughts..." className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-transparent p-4 text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
                  <button  onClick={handleSubmitReview} className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95">  Submit Review</button>
                 <p className="mt-6 text-center text-sm text-gray-400">  No reviews yet. Be the first to review this product. </p>
             </div>
           )}
         </div>
      {/* Related Products */}
     <div className="mx-auto mt-12 w-[80%]">
       <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]">  Related Products </h2>
       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <Link  key={item._id}  to={`/products/${item._id}`}  className="group relative overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <span className="absolute left-3 top-3 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">  {item.category} </span>
           <button
             onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
               handleWishlistItem(item._id);
             }}
             className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:bg-red-100 hover:text-red-500" >
             <Heart size={18} />
           </button>
           <div className="overflow-hidden rounded-xl">
              <img src={item.images?.[0]?.url} alt={item.name} className="mx-auto h-44 object-contain transition-transform duration-300 group-hover:scale-110" />
           </div>
           <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]"> {item.name} </h3>
           <p className="mt-1 text-sm text-gray-500">  {item.brand} </p>
           <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
               <Star key={star} size={16} className={ star <= Math.round(item.averageRating || 0)  ? "fill-yellow-400 text-yellow-400"  : "text-gray-300"}/>
             ))}
             <span className="ml-2 text-sm text-gray-400">  ({item.numReviews}) </span>
           </div>
           <div className="mt-3">
             <span className="text-xl font-bold text-blue-600"> EGP {item.discountPrice || item.price} </span>
              {item.discountPrice > 0 && (
               <span className="ml-2 text-gray-400 line-through"> EGP {item.price} </span>
             )}
           </div>
           <button onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               handleAddToCartItem(item._id);
             }}
             className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
             <ShoppingCart size={18} /> Add to Cart
            </button>
         </Link>
       ))}
     </div>
   </div>
  </section>
  );
}
export default ProductDetailsPage;

