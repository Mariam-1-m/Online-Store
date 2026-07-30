
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import ProductTabs from "../components/ProductDetails/ProductTabs";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function ProductDetailsPage() {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("description");
    const [rating, setRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [review, setReview] = useState("");
    const [wishlistIds, setWishlistIds] = useState([]);

   
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

    useEffect(() => {
        const fetchWishlistIds = async () => {
            try {
                const response = await api.get("/wishlists/my");
                const products = response.data.wishlist?.products || [];
                setWishlistIds(products.map((p) => p._id));
            } catch (error) {
                console.log(error);
            }
        };

        fetchWishlistIds();

        window.addEventListener("wishlistUpdated", fetchWishlistIds);
        window.addEventListener("wishlistItemDeleted", fetchWishlistIds);

        return () => {
            window.removeEventListener("wishlistUpdated", fetchWishlistIds);
            window.removeEventListener("wishlistItemDeleted", fetchWishlistIds);
        };
    }, []);

    const handleAddToWishlist = async (targetIdOrEvent) => {
        const targetId = typeof targetIdOrEvent === "string" ? targetIdOrEvent : product?._id;

        if (!targetId) return;

        const isWishlisted = wishlistIds.includes(targetId);

        try {
            if (isWishlisted) {
                await api.delete(`/wishlists/remove/${targetId}`);
                toast.success("Removed from wishlist");
            } else {
                await api.post(`/wishlists/add/${targetId}`);
                toast.success("Added to wishlist");
            }
            window.dispatchEvent(new Event("wishlistUpdated"));
        } catch (error) {
            console.log(error.response?.data || error);
            toast.error("Failed to update wishlist");
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
            
            toast.success("Review submitted successfully");
        } catch (error) {
            console.log("Backend Error Details:", error.response?.data);
            toast.error(error.response?.data?.message || "Failed to submit review");
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <section className="min-h-screen bg-[var(--background)] py-10">
            <div className="mx-auto max-w-7xl px-4">
                <ProductInfo
                    product={product}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={() => { addToCart(product._id, 1); }}
                    handleAddToWishlist={handleAddToWishlist}
                    isWishlisted={wishlistIds.includes(product?._id)}
                />
            </div>
            
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
            
            <RelatedProducts
                relatedProducts={relatedProducts}
                handleWishlistItem={handleAddToWishlist}
                handleAddToCartItem={(productId) => addToCart(productId, 1)}
                wishlistIds={wishlistIds}
            />
        </section>
    );
}

export default ProductDetailsPage;