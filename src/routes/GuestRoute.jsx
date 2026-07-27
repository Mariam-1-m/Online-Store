import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const token = localStorage.getItem("token");
  const user =localStorage.getItem("user");
    return token && user ? <Navigate to="/" replace /> : <Outlet />;
}