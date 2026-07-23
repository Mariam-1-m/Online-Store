import OrderNotesCard from "../components/Checkout/OrderNotesCard";
import OrderSummaryCard from "../components/Checkout/OrderSummaryCard";
import PaymentMethodeCard from "../components/Checkout/PaymentMethodeCard";
import ShippingCard from "../components/Checkout/ShippingCard";
import { useState } from 'react';
import api from "../lib/api";
import { useNavigate } from "react-router-dom";

function CheckoutPage(){
const navigate=useNavigate();
const [shippingData,setShippingData]=useState({
    fullName:'',
    phone:'',
    country:'Egypt',
    city:'',
    address:'',
    postalCode:''
})
const [OrderNotes,setOrderNotes]=useState('');
const [paymentMethode,setPaymentMethode]=useState('cash');
const [orderData, setOrderData] = useState(null);
const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState('');

const handleShippingChange=(e)=>{
    setShippingData({...shippingData,[e.target.name]:e.target.value})
}

const handlePlaceOrder=async (e)=>{
    try{
     e.preventDefault()
      const payload={
        shippingAddress:shippingData,
        paymentMethod:paymentMethode,
        customerNote:OrderNotes,
       
      }
      setLoading(true);
      setErrorMessage('');
      const response=await api.post('/orders',payload);
      const data = response.data;
      console.log(data);
      setOrderData(data.order);
      console.log("Order Success Response:", data);

      const orderId = data.order?._id || data.id || "27077823";
      navigate(`/success-order/${orderId}`);
    }catch (err) {
    console.log("Server Error Response:", err.response?.data);
      
      setErrorMessage(err.response?.data?.message || err.message);
    }finally{
      setLoading(false);
    }
}

return(
    <form className="w-full h-auto flex flex-col  md:flex-row justify-between gap-5  px-15 py-12 ">
   
       <div className="w-full md:w-[65%] flex flex-col justify-between gap-5">
         <h2 className="font-bold text-2xl">Checkout</h2>
         <ShippingCard shippingData={shippingData}  onChange={handleShippingChange}/>
        <PaymentMethodeCard paymentMethode={paymentMethode} setPaymentMethode={setPaymentMethode}/>
        <OrderNotesCard setOrderNotes={setOrderNotes}/>
       </div>
        
        <div className="w-full md:w-[32%]">
             <OrderSummaryCard orderData={orderData} loading={loading} errorMessage={errorMessage} handlePlaceOrder={handlePlaceOrder}/>
        </div>

    </form>
)
}
export default CheckoutPage;
