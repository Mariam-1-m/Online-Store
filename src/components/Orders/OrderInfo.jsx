import OrderStatus from "./OrderStatus";

function OrderInfo({ order }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          #{order._id.slice(-8)}
        </span>
        <OrderStatus orderStatus={order.status} />
      </div>
      <p className="text-sm text-slate-500">
        {new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <p className="text-sm text-slate-400">
        <span>{order.items[0].quantity} </span>
        <span>item(s)</span>
      </p>
    </div>
  );
}

export default OrderInfo;
