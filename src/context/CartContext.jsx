import { createContext,  useState, useEffect } from 'react';
import api from '../lib/api';
import {CheckCircle2,Trash2,Tag}  from 'lucide-react'
import { AuthContext } from './AuthContext';
import toast, { Toaster } from 'react-hot-toast';
export const CartContext = createContext();

export function CartProvider({ children }) {
    const token=localStorage.getItem("token");
    const [cartData,setCartData]=useState({})
    const [cartItems, setCartItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [shipping,setShipping]=useState(50);
    const [coupon, setCoupon] = useState(null);
    const  [tax,setTax]=useState(0)
    const [loading, setLoading] = useState(false);

    const showToast = (message, iconComponent) => {
        toast.success(message, {
            position: 'top-center',
            icon: iconComponent,
            style: {
                borderRadius: '12px',
                background: '#333',
                color: '#fff',
            },
        });
    };
 
   
    const fetchCart = async () => {
        if (!token) {
            setCartItems([]);
            setItemCount(0);
            setSubtotal(0);
            setDiscountAmount(0);
            setTotal(0);
            setShipping(0)
            setCoupon(null);
            setTax(0);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get('/carts');
            const data = response.data;
            console.log(response.data)
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            if(data.total>1000){
                setShipping("Free")
            }else{
                setShipping(50)
            }
            setCoupon(data.coupon || null);
            setTax(data.total*0.14 || 0);
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
            showToast("Item added to cart successfully!", <CheckCircle2 className="text-green-400" size={20} />);
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            if(data.total>1000){
                setShipping("Free")
            }else{
                setShipping(50)
            }
            setCoupon(data.coupon || null);
            setTax(data.total*0.14 || 0);
            await fetchCart();
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
             window.dispatchEvent(
            new Event("cartUpdated")
            );
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            if(data.total>1000){
                setShipping("Free")
            }else{
                setShipping(50)
            }
            setTax(data.total*0.14 || 0);
            setCoupon(data.coupon || null);
        } catch (error) {
            console.error("Failed to update quantity", error.response?.data || error.message);
        }
    };

  
    const removeFromCart = async (productId) => {
        const confirm=window.confirm("Do you want to delete this item from the cart? ")
    if(confirm){
        try {
            const response = await api.delete(`/carts/items/${productId}`);
            const data = response.data;
            showToast("Item removed from cart!", <Trash2 className="text-red-400" size={20} />);
            setCartItems(data.items || []);
            setItemCount(data.itemCount || 0);
            setSubtotal(data.subtotal || 0);
            setDiscountAmount(data.discountAmount || 0);
            setTotal(data.total || 0);
            if(data.total>1000){
                setShipping("Free")
            }else{
                setShipping(50)
            }
            setCoupon(data.coupon || null);
            setTax(data.total*0.14||0);
            fetchCart()
        } catch (error) {
            console.error("Failed to remove item", error.response?.data || error.message);
        }
    }
    };

    const applyCoupon = async (couponCode) => {
        try {
            const response = await api.post('/carts/coupon', { code: couponCode });
            const data = response.data;
            showToast("Coupon applied successfully!", <Tag className="text-indigo-400" size={20} />);
            await fetchCart();
            setCoupon(data.coupon || data.code || couponCode);
        } catch (error) {
            console.error("Failed to apply coupon", error.response?.data || error.message);
            throw error; 
        }
    };

    const removeCoupon=async ()=>{
        try{
         await api.delete("/carts/coupon");
        showToast("Coupon removed.", <Tag className="text-amber-400" size={20} />);
        await fetchCart();
            setCoupon(null);
        }catch(error){
      console.error("Failed to remove coupon ",error.response?.data || error.message)
        }
    }
    return (
        <CartContext.Provider value={{
            cartData, 
            cartItems, 
            itemCount, 
            subtotal, 
            discountAmount, 
            total, 
            shipping,
            coupon, 
            tax,
            loading, 
            fetchCart, 
            addToCart,
            updateItemQuantity, 
            removeFromCart,
            applyCoupon,
            removeCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
}