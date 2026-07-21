import OrderNotesCard from "../components/Checkout/OrderNotesCard";
import OrderSummaryCard from "../components/Checkout/OrderSummaryCard";
import PaymentMethodeCard from "../components/Checkout/PaymentMethodeCard";
import ShippingCard from "../components/Checkout/ShippingCard";

function CheckoutPage(){
return(
    <div className="w-full h-auto flex flex-col  md:flex-row justify-between gap-5  p-15 ">
       <div className="w-full md:w-[65%] flex flex-col justify-between gap-5">
         <ShippingCard/>
        <PaymentMethodeCard/>
        <OrderNotesCard/>
       </div>
        
        <div className="w-full md:w-[32%]">
             <OrderSummaryCard/>
        </div>

    </div>
)
}
export default CheckoutPage;