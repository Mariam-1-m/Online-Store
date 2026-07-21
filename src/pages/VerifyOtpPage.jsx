import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
      
const navigate = useNavigate()
      const [loading, setLoading] = useState(false);
      const { register, handleSubmit } = useForm();

      const onError = (errors) => {
        if(errors.password) {
         toast.error("Please enter your password")
        }
      }

      const onSubmit = async (data) => {
        try{
        setLoading(true);
        }catch(err){
        toast.error(err.response?.data?.message || "Something went wrong")
        }finally{
            setLoading(false);
        }
      }

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
        <p className="text-sm text-slate-500 mt-1">We sent a 6-digit code to mazen.ahmed.abdelattii@gmail.com</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit,onError)} className="bg-white max-w-md mx-auto w-full space-y-4 dark:bg-gray-800/90 rounded-xl border border-gray-500/20 dark:border-slate-700 p-6">
        <div>

            







            

          <label className="text-xs font-medium text-slate-500 mb-1">
            New Password
          </label>
            <input
             {...register("password", {
                required: "Password is required."
            })}
              placeholder="Enter new password"
              className= "dark:bg-slate-900/90 w-full pl-4 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-700 dark:text-slate-200 focus:outline-none dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-violet-500"
              type="password"
            />
        </div>


        <button disabled={loading} type="submit" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-violet-600 dark:bg-blue-800 text-white hover:bg-violet-700 dark:hover:bg-blue-900 dark:active:bg-blue-950 active:bg-violet-800 px-6 py-3 text-base w-full">
          {loading? (
          <div className="flex items-center gap-2.5">
          <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>  
          <span>Reset Password</span>
          </div>
          ): (
           <span>Reset Password</span>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
           Didn't receive the code?
          <Link
            className="text-violet-700 dark:text-blue-700 hover:text-violet-800 dark:hover:text-blue-800 font-medium"
          >
            {" "}
            Resend
          </Link>
        </p>
      </form>
    </div>
  )
}
