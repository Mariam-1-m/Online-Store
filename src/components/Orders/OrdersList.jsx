import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";

function OrdersList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-slate-400">
        No orders found.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders?.map((order) => (
        <Link
          to={`/orders/${order._id}`}
          className="block bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-md transition-shadow p-5 rounded-xl"
          key={order._id}
        >
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}

export default OrdersList;
