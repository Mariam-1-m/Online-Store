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
    console.log(data)
    await axios.post("/auth/register/send-otp", data)
    toast.success("OTP sent to your email")
    navigate("/verify-otp", {
      state: {email : data.email}
    })
    }catch(err){
        toast.error(err.response?.data?.message || "Something went wrong");
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
