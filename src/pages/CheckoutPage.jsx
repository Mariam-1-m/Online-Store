import OrderNotesCard from "../components/Checkout/OrderNotesCard";
import PaymentMethodeCard from "../components/Checkout/PaymentMethodeCard";

function CheckoutPage(){
return(
    <div className="w-full h-auto  p-15">
        <PaymentMethodeCard/>
        {/* <OrderNotesCard/> */}
    </div>
)
}
export default CheckoutPage;