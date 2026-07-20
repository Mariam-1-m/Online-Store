import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignupForm({onSubmit,loading}) {

  const { register, handleSubmit, formState: { errors } } = useForm();
      
  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <div className="mb-8 text-center">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center justify-center gap-2 text-violet-700 dark:text-blue-700 mb-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            stroke-linejoin="round"
            className="lucide lucide-zap w-7 h-7"
            aria-hidden="true"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
          </svg>
          Koda Store
        </Link>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Create an account
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Join us and start shopping
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-4 max-w-md mx-auto w-full dark:bg-gray-800/90 rounded-xl border dark:border-slate-700 border-gray-500/20 p-6">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1">
            Username
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="lucide lucide-user absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0 -4 -4H9a4 4 0 0 0 -4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
            {...register("username", {
                required: "Username is required."
            })}
              placeholder="johndoe"
              className={`w-full pl-10 dark:bg-slate-900/90 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-700 dark:text-slate-200 focus:outline-none ${errors.username ? "border-red-500" : "dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-violet-500"}`}
              type="text"
            />
          </div>
            {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 mb-1">
            Email
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            </svg>
            <input
             {...register("email", {
                required: "Email is required."
            })}
              placeholder="you@example.com"
              className={`w-full dark:bg-slate-900/90 pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-700 dark:text-slate-200 focus:outline-none ${errors.email ? "border-red-500" : "dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-violet-500"} `}
              type="email"
            />
           
          </div>
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500 mb-1">
            Password
          </label>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linejoin="round"
              stroke-linejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input
             {...register("password", {
                required: "Password is required.",
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                }
            })}
              placeholder="••••••••"
              className={`w-full pl-10 dark:bg-slate-900/90 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-700 dark:text-slate-200 focus:outline-none ${errors.password ? "border-red-500" : "dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-violet-500"}`}
              type="password"
            />
           
          </div>
           {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
        </div>

        <button disabled={loading} type="submit" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-violet-600 dark:bg-blue-800 dark:hover:bg-blue-900 dark:active:bg-blue-950 text-white hover:bg-violet-700 active:bg-violet-800 px-6 py-3 text-base w-full">
          {loading? (
          <div className="flex items-center gap-2.5">
          <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>  
          <span>Create Account</span>
          </div>
          ): (
           <span>Create Account</span>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          Already have an account?
          <Link
            to="/login"
            className="text-violet-700 dark:text-blue-700 hover:text-violet-800 dark:hover:text-blue-800 font-medium"
          >
            {" "}
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
