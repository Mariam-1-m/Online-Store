import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function LoginForm({onSubmit,loading}) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <div className="mb-8 text-center">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center justify-center gap-2 text-indigo-600 dark:text-blue-700 mb-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-origami-icon lucide-origami"><path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"/><path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"/><path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"/></svg>
          Lumina Store
        </Link>

        <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Welcome back
        </h1>
        <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white max-w-md mx-auto w-full space-y-4 dark:bg-gray-800/90 rounded-xl border border-gray-500/20 dark:border-slate-700 p-6">
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
              strokeLinejoin="round"
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
              className={`dark:bg-slate-900/90 w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-white text-slate-700 dark:text-slate-200 focus:outline-none  ${errors.email ? "border-red-500" : "dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-indigo-500"}`}
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
              strokeLinejoin="round"
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
              className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 focus:outline-none ${errors.password ? "border-red-500" : "dark:border-slate-600 border-gray-500/20 focus:ring-2 focus:ring-indigo-500"}`}
              type="password"
            />
          </div>
             {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
        </div>

        <Link
          to="/forgot-password"
          className="text-indigo-700 dark:text-blue-800 hover:text-indigo-800 dark:hover:text-blue-900 font-medium text-right block"
        >
          Forgot password?
        </Link>

        <button disabled={loading} type="submit" className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 dark:bg-blue-800 text-white hover:bg-indigo-700 dark:hover:bg-blue-900 dark:active:bg-blue-950 active:bg-indigo-800 px-6 py-3 text-base w-full">
          {loading? (
          <div className="flex items-center gap-2.5">
          <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>  
          <span>Sign In</span>
          </div>
          ): (
           <span>Sign In</span>
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?
          <Link
            to="/register"
            className="text-indigo-700 dark:text-blue-700 hover:text-indigo-800 dark:hover:text-blue-800 font-medium"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
