import { NavLink } from 'react-router-dom';
import { Heart ,MessageCircle,Globe} from 'lucide-react';
import logoImage from "../assets/logo.png";



 function Footer() {
    return (
        <div className="footer w-full min-h-60  p-4 bottom-0 bg-white/80 dark:bg-slate-900/90 border-t border-gray-300 flex flex-col   items-center justify-center">
       <div className="footerContent w-[95%] h-auto  lg:p-2  p-5 flex flex-col md:flex-row items-start md:items-center justify-center  ">
        <div className="leftSide   flex flex-col  items-start   pb-12  w-1/2 h-auto  text-left ">

    <div className="logo rounded-2xl overflow-hidden text-2xl font-bold text-indigo-600"><img src={logoImage} alt="" className="w-18 h-12"/></div>
         <p className="text-gray-500 text-sm w-full md:w-[50%]">Shop the future, delivered today. Premium products at the best prices with fast delivery across Egypt.</p>
        </div>


         <div className="rightSide  w-1/2 h-auto  flex flex-col md:flex-row items-start justify-between gap-8 pr-[10%] pt-6  pb-10">
            <div className=" text-left   h-auto flex flex-col justify-start gap-3">
                <h3 className="font-bold text-md ">Quick Links</h3>
            <ul className="">
               <li><NavLink className=" text-1xs text-gray-500 hover:text-indigo-600" to="/products">shop</NavLink></li>
               <li><NavLink className=" text-1xs text-gray-500 hover:text-indigo-600" to="/orders">My Orders</NavLink></li>
               <li><NavLink className=" text-1xs text-gray-500 hover:text-indigo-600" to="/wishlist">Wishlist</NavLink></li>
               <li><NavLink className=" text-1xs text-gray-500 hover:text-indigo-600" to="/profile">Profile</NavLink></li>

            </ul>
            </div >

             <div className="flex flex-col justify-start h-auto   gap-3 text-left">
                <h3 className="font-bold">Follow Us</h3>
            <ul className="flex  justify-center gap-3">
                
                <li className="size-9  leading-3 flex items-center justify-center rounded-full bg-gray-100 hover:text-indigo-600"><NavLink to="/"><Globe size={16}/></NavLink></li>
               <li className="size-9  leading-3 flex items-center justify-center rounded-full bg-gray-100 hover:text-indigo-600"><NavLink to="/"><MessageCircle size={16} /></NavLink></li>
               <li className="size-9  leading-3 flex items-center justify-center rounded-full bg-gray-100 hover:text-indigo-600"><NavLink to="/"><Heart size={16}/></NavLink></li> 
               

            </ul>
            </div>
        </div>

        </div> 
        <div className="footerBottom border-t pt-2 border-gray-300 w-full h-10 flex items-center justify-center">
<p className="text-gray-500 text-sm">© 2026 Koda Store. All rights reserved.</p>
        </div>
        </div>
    );
}

export default Footer;