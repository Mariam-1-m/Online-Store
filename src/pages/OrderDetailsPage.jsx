import { useState, useEffect } from 'react';
import api from '../lib/api';
import Loader from '../components/Loader';
import { AlertCircle } from 'lucide-react';
import OrderProgressCard from '../components/OrderDetails/OrderProgressCard';
import OrderItemCards from '../components/OrderDetails/OrderItemsCards';
import OrderShippingCard from '../components/OrderDetails/OrderShippingCard';
import OrderPaymentCard from '../components/OrderDetails/OrderPaymentCard';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export function OrderDetailsPage() {
  const { orderId } = useParams();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await api.get(`/orders/my/${orderId}`);
      console.log(response.data.order)
      setOrder(response.data.order);
    } catch (error) {
      console.log(error.message);
      setErrorMessage("Could not load order details. Please check the order ID or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    try {
      await api.patch(`/orders/my/${order._id}/cancel`);
      toast.success("Order is Cancelled!");
      fetchOrder(); 
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  
  const currentStatus = order?.status?.toLowerCase();
  const isCancellable = currentStatus === 'pending' || currentStatus === 'confirmed' ;

  return (
    <div className="w-[80%] m-auto p-8 min-h-screen flex flex-col justify-between gap-5 text-slate-900 dark:text-slate-100 md:p-12 transition-colors duration-300">
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <div className="text-center py-20 text-red-500 font-medium">
          <p>{errorMessage}</p>
        </div>
      ) : !order ? (
        null
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Order Details</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Order #{order._id ? order._id.slice(-8).toUpperCase() : ""}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${currentStatus === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'} ${currentStatus === 'cancelled' ? 'text-red-500' : 'text-blue-600'}  dark:bg-[#020617] dark:text-blue-300 border border-blue-200 dark:border-blue-800`}
            >
              {order.status}
            </span>
          </div>

          <OrderProgressCard orderStatus={order.status} />
          <OrderItemCards items={order.items} />
          
          <div className="flex justify-between gap-2">
            <OrderShippingCard shippingAddress={order.shippingAddress} />
            <OrderPaymentCard paymentMethode={order.paymentMethod} total={order.totalPrice} creationDate={order.createdAt}/>
          </div>

          {isCancellable ? (
            <div className="flex justify-center pt-2">
              <button 
                onClick={cancelOrder} 
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-xl transition-colors flex items-center gap-2 text-xs shadow-md"
              >
                <AlertCircle className="w-3.5 h-3.5" /> Cancel Order
              </button>
            </div>
          ):<></>}
        </>
      )}
    </div>
  );
}

export default OrderDetailsPage;