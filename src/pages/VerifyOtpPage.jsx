import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../lib/api.js"

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [time, setTime] = useState(60);
  const [loading, setLoading] = useState(false);
  const resendRef = useRef(false);
  const [otp, setOTP] = useState(["","","","","",""])
  const { register, handleSubmit } = useForm();
  const [searchParams] = useSearchParams();
  const otpVerifyEmail = searchParams.get("email")
  const mode = searchParams.get("mode")
  const location = useLocation();
  const createAccountEmail = location?.state?.email
  const email = mode === "reset" ? otpVerifyEmail : createAccountEmail 
  const isReset = mode === "reset"

  useEffect(()=> {
  if(!email){
    navigate("/login")
  }
  },[email,navigate])

  useEffect(() => {
    if (time === 0) {
      resendRef.current = false
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const resend = async () => {
    if(resendRef.current) {
    return;
    }
    try{
      resendRef.current = true;
      console.log("Sending request...");
      if(isReset){
       await axios.post("/auth/forgot-password/send-otp", {email});
      }else{
       await axios.post("/auth/register/send-otp", {email});
      }
    setTime(60);
    toast.success("OTP resent")
    }catch(err){
    resendRef.current = false;
    toast.error(err.response?.data?.message || "Something went wrong");
    }

  };

  const onError = (errors) => {
     if(errors.newPassword) {
      toast.error("Please enter your password");
      return;
    }
  };

  const onSubmit = async (data) => {
    try {
    const otpCode = otp.join("")
    if(otpCode.length !== 6){
      toast.error("Please enter complete OTP")
      return;
    }
      setLoading(true);
      const payload1 = {
        email: email,
        otp: otpCode,
        newPassword: data.newPassword,
      }
      const payload2 = {
        email:email,
        otp: otpCode,
      }
      if(isReset){
      await axios.post("/auth/forgot-password/verify-otp", payload1)
      }else{
      await axios.post("/auth/register/verify-otp", payload2)
      }
      toast.success(isReset ? "Password reset successfully" : "Account created successfully")
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputRef = useRef([]);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <div className="mb-8 text-center">
        <div className="text-2xl font-bold flex items-center justify-center gap-2 text-violet-700 dark:text-blue-700 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-zap w-10 h-10"
            aria-hidden="true"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Verify Your Email
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          We sent a 6-digit code to <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span>
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-white max-w-md mx-auto w-full space-y-4 dark:bg-gray-800/90 rounded-xl border border-gray-500/20 dark:border-slate-700 p-6"
      >
        <div>
          <div className="flex items-center justify-center gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                value={otp[index]}
                key={index}
                ref={(e1) => (inputRef.current[index] = e1)}
                onChange={(e) => {
                  const value = e.target.value
                  const newOTP = [...otp]
                    newOTP[index] = value
                    setOTP(newOTP)
                  if (value && index < 5) {
                    inputRef.current[index + 1].focus();
                  }
                }}
                type="text"
                maxLength={1}
                className="w-12 h-15 font-bold text-xl text-center border focus:ring-2 focus:ring-violet-500 rounded-lg bg-white dark:bg-slate-900/90 border-gray-500/20 dark:border-slate-700"
                inputMode="numeric"
              />
            ))}
          </div>
           
           { mode === "reset" && 
           <div>
          <label className="text-xs font-medium text-slate-500 mb-1">
            New Password
          </label>
          <input
            {...register("newPassword", {
              required: "Password is required.",
            })}
            placeholder="Enter new password"
            className="dark:bg-slate-900/90 w-full pl-4 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-700 dark:text-slate-200 focus:outline-none dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-violet-500"
            type="password"
          />
           </div>
           }
        </div>

        <button
          disabled={loading}
          type="submit"
          className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-violet-600 dark:bg-blue-800 text-white hover:bg-violet-700 dark:hover:bg-blue-900 dark:active:bg-blue-950 active:bg-violet-800 px-6 py-3 text-base w-full"
        >
          {loading ? (
            <div className="flex items-center gap-2.5">
              <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{isReset ? "Reset Password" : "Verify & Create Account"}</span>
            </div>
          ) : (
              <span>{isReset ? "Reset Password" : "Verify & Create Account"}</span>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          Didn't receive the code?
          <div className="text-violet-700 inline-block dark:text-blue-700 hover:text-violet-800 dark:hover:text-blue-800 font-medium">
            {time === 0 ? (
              <span className="ml-1" onClick={resend}>
                Resend
              </span>
            ) : (
              <span
                className={`font-semibold ml-1 text-slate-400 cursor-not-allowed ${time === 0 ? "hidden" : "visible"}`}
                disabled
              >
                Resend in {time}s
              </span>
            )}
          </div>
        </p>
      </form>
    </div>
  );
}
