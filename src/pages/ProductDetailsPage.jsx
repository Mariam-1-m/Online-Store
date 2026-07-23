import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";

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
      <div className="mx-auto max-w-7xl px-4">
          {/*  ProductInfo.jsx */}
          <ProductInfo
             product={product}
             quantity={quantity}
             setQuantity={setQuantity}
             handleAddToCart={handleAddToCart}
             handleAddToWishlist={handleAddToWishlist}
           />
       </div>
           {/*  ProductTabs.jsx */}
        <ProductTabs
         activeTab={activeTab}
         setActiveTab={setActiveTab}
         product={product}
         rating={rating}
         setRating={setRating}
         review={review}
         setReview={setReview}
          handleSubmitReview={handleSubmitReview}
        />
           {/* Related Products */}
       <RelatedProducts
          relatedProducts={relatedProducts}
          handleWishlistItem={handleWishlistItem}
          handleAddToCartItem={handleAddToCartItem}
         />
   </section>
  );
}
export default ProductDetailsPage;