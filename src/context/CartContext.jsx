import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const { token } = useContext(AuthContext);
    const [cartData,setCartData]=useState({})
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(false);

  
    const fetchCart = async () => {
        if (!token) {
            setCartItems([]);
            setItemCount(0);
            setSubtotal(0);
            setDiscountAmount(0);
            setTotal(0);
            setCoupon(null);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get('/carts');
            const data = response.data;
            
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            setCoupon(data.coupon || null);
        } catch (error) {
            console.error("Failed to fetch cart", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }; 

 
    useEffect(() => {
        const getCart = async () => {
            await fetchCart();
        };
        getCart();
    }, [token]);

    
    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await api.post('/carts', { productId, quantity });
            const data = response.data;
            
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            setCoupon(data.coupon || null);
        } catch (error) {
            console.error("Failed to add to cart", error.response?.data || error.message);
        }
    };


    const updateItemQuantity = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            const response = await api.patch('/carts/items', { 
                productId: String(productId), 
                quantity: Number(quantity) 
            });
            const data = response.data;
            
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            setCoupon(data.coupon || null);
        } catch (error) {
            console.error("Failed to update quantity", error.response?.data || error.message);
        }
    };

  
    const removeFromCart = async (productId) => {
        const confirm=window.confirm("Do you want to delete this item from the cart? ")
    if(confirm){
        try {
            const response = await api.delete('/carts/items', {
                data: { productId: String(productId) }
            });
            const data = response.data;
            
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            setCoupon(data.coupon || null);
        } catch (error) {
            console.error("Failed to remove item", error.response?.data || error.message);
        }
    }
    };

    const applyCoupon = async (couponCode) => {
        try {
            const response = await api.post('/carts/coupon', { coupon: couponCode });
            const data = response.data;
            
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            setCoupon(data.coupon || null);
        } catch (error) {
            console.error("Failed to apply coupon", error.response?.data || error.message);
            throw error; 
        }
    };

    return (
        <CartContext.Provider value={{
            cartData, 
            cartItems, 
            itemCount, 
            subtotal, 
            discountAmount, 
            total, 
            coupon, 
            loading, 
            fetchCart, 
            addToCart,
            updateItemQuantity, 
            removeFromCart,
            applyCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
}