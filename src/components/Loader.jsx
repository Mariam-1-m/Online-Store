function Loader() {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center min-h-screen bg-(--bg-primary)">
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-400 border-r-blue-500 animate-spin"></div>

        <div className="absolute inset-2 rounded-full border border-indigo-500/30 blur-[1px]"></div>
        <div className="absolute inset-3 rounded-full border-2 border-transparent border-b-purple-500 border-l-pink-500 animate-[spin_1s_linear_infinite_reverse]"></div>
      </div>

      <div className="flex items-center gap-x-1.5 font-bold tracking-widest text-sm text-(--text-primary) opacity-80 pl-4">
        LOADING
        <div className="flex gap-x-1 items-center pt-1">
          <div className="h-1.5 w-1.5 bg-(--text-primary) rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-1.5 w-1.5 bg-(--text-primary) rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-1.5 w-1.5 bg-(--text-primary) rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
