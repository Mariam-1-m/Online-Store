import { useState } from "react";
import LoginForm from "../components/Login/LoginForm.jsx";
import axios from "../lib/api.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <LoginForm onSubmit={onSubmit} loading={loading} />
    </>
  );
}
