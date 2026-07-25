import { baseStatusClasses, statusClasses } from "../../utils/statusClasses";

function OrderStatus({ orderStatus }) {
  return (
    <span
      className={`${baseStatusClasses} ${statusClasses[orderStatus] || statusClasses.pending}`}
    >
      {orderStatus}
    </span>
  );
}

export default OrderStatus;
