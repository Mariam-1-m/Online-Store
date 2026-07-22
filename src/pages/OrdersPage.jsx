import { useEffect, useState } from "react";
import { getOrders } from "../services/ordersApi";
import Loader from "../components/Loader";
import OrdersList from "../components/Orders/OrdersList";
import OrderHeader from "../components/Orders/OrderHeader";
import MoreOrders from "../components/Orders/MoreOrders";

function OrdersPage() {
  const [ordersData, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders(limit, token);
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [limit, token]);

  if (isLoading && limit === 10) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6 animate-fade-in">
      <OrderHeader />
      <OrdersList orders={ordersData.orders} />
      {ordersData?.orders?.length >= limit && (
        <MoreOrders
          totalOrders={ordersData.total}
          limit={limit}
          setLimit={setLimit}
        />
      )}
    </div>
  );
}

export default OrdersPage;
