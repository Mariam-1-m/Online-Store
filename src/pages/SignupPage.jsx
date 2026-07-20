import axios from "../lib/api.js";
import SignupForm from "../components/Signup/SignupForm.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
    const onSubmit = async (data) => {
    try{
    setLoading(true)
    const res = await axios.post("/auth/register/send-otp", data)
    console.log(res)
    toast.success("OTP sent to your email")
    navigate("/verify-otp")
    }catch(err){
        console.log(err.response?.data)
    }finally{
      setLoading(false)
    }
    }
  return (
    <>
      <SignupForm onSubmit={onSubmit} loading={loading}/>
    </>
  );
}
