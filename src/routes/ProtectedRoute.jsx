import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";
import AccessDenied from "../components/access-denied";

function ProtectedRoute() {
  const { user, status } = useAuth();

  if (status === "loading") {
    return <Loader />;
  } else if (status === "unauthenticated") {
    return <Navigate replace to="/login" />;
  }

  if (!user || user.role !== "customer") {
    return <AccessDenied />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
