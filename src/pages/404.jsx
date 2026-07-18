
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="relative min-h-screen  overflow-hidden flex items-center justify-center mb-16 p-6">
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-600 blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-600 blur-3xl"></div>
  </div>
  
  <div className="relative z-10 text-center max-w-2xl mx-auto">
    <div className="relative mb-12">
      <h1 className="text-[120px] md:text-[180px] font-bold text-(--text-primary) tracking-tighter">
        <span className="relative">
          <span className="absolute inset-0 text-purple-400 opacity-70 animate-glitch-1">404</span>
          <span className="absolute inset-0 text-cyan-400 opacity-70 animate-glitch-2">404</span>
          <span className="relative">404</span>
        </span>
      </h1>
    </div>
    
    <h2 className="text-3xl md:text-5xl font-bold text-(--text-primary) mb-6">
      Page Not Found
    </h2>
    
    <p className="dark:text-gray-400 text-gray-600 text-lg mb-10">
      Oops! The page you're looking for has vanished into the digital void.
      <br />
      <Link to='/' className='text-sm text-blue-600' replace>Go Home</Link>
    </p>
    

  </div>

  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
    <div className="w-3 h-3 bg-purple-400 rounded-full animate-float delay-100"></div>
    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-float delay-300"></div>
    <div className="w-4 h-4 bg-white rounded-full animate-float delay-500"></div>
  </div>


</section>
  )
}

export default NotFoundPage