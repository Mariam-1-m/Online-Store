import OrderInfo from "./OrderInfo";
import OrderPrice from "./OrderPrice";

function OrderCard({ order }) {
  return (
    <div className="flex justify-between items-center">
      <OrderInfo order={order} />
      <OrderPrice orderPrice={order.totalPrice} />
    </div>
  );
}

export default OrderCard;
