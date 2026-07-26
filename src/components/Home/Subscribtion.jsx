
import { Mail } from 'lucide-react';
export default function Subscribtion() {
  return (
    <div className="SubscribtionSection bg-[#0F172A] h-[80vh] flex flex-col items-center justify-center">
      
      <div className="SubscribtionContainer1 bg-[#463CD1]  w-[90%] h-[75%] p-25 flex flex-col items-center justify-center   rounded-3xl text-white">
        <div className="SubscribtionContainer2 flex flex-col items-center text-center ">
          <Mail className="size-11  -mt-5 " />
          <h3 className=" text-3xl font-bold  mt-5">Stay Updated</h3>
          <p className='text-[#0c0e15] mt-5 '>Subscribe to our newsletter and get exclusive deals and <br /> new arrivals first.</p>

          <div className="SubscribtionContainer3 flex gap-3 mt-10   w-full  h-13  max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className=" bg-[#ffffff1a]  p-2  w-90  rounded-lg  focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className=" font-semibold bg-white w-40 text-[#463CD1] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className='bg-white' />
   
    </div>
  )
}