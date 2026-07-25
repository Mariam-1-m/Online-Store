import { useEffect, useState } from "react";
import { getOrders } from "../services/ordersApi";
import Loader from "../components/Loader";
import OrdersList from "../components/Orders/OrdersList";
import OrderHeader from "../components/Orders/OrderHeader";
import OrderPagination from "../components/Orders/OrderPagination";

function OrdersPage() {
  const [ordersData, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchOrders() {
      try {
        setIsLoading(true);
        const data = await getOrders(currentPage, token);
        console.log(data);
        setOrders(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [currentPage, token]);

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pb-12 space-y-6 animate-fade-in">
      <OrderHeader />
      <OrdersList orders={ordersData.orders} />
      <OrderPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={ordersData.totalPages}
      />
    </div>
  );
}

export default OrdersPage;
