import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function ProtectedRoute() {
    const location = useLocation()
    const token = localStorage.getItem("token")
    return token ? <Outlet /> : <Navigate to="/login" replace state={{from: location}}/>
}
