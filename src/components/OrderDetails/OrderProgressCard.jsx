import { CheckCircle2, Clock } from 'lucide-react';

export default function OrderProgressCard({ orderStatus }) {
  const allSteps = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

  const normalizedStatus = orderStatus 
    ? orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1).toLowerCase() 
    : "Pending";

  const currentIndex = allSteps.indexOf(normalizedStatus);
  const activeIndex = currentIndex !== -1 ? currentIndex : 0;

  const progressPercentage = (activeIndex / (allSteps.length - 1)) * 100;

  return (
    <div className="bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-2xl p-6 backdrop-blur-sm">
      <h2 className="text-sm font-semibold mb-6 text-slate-700 dark:text-slate-300">Order Progress</h2>
      
      <div className="relative flex items-center justify-between max-w-2xl mx-auto px-4">
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
        
        <div 
          className="absolute top-1/2 left-4 h-0.5 bg-indigo-600 -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>

        {allSteps.map((label, idx) => {
          const isActive = idx <= activeIndex;

          return (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className={isActive 
                ? "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all bg-indigo-600 border-indigo-600 text-white shadow-md" 
                : "w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-400"
              }>
                {isActive ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-3.5 h-3.5" />}
              </div>
              <span className={isActive ? "text-xs mt-2 font-medium text-slate-900 dark:text-white" : "text-xs mt-2 font-medium text-slate-400"}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}