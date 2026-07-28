import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useState, useContext, useEffect } from "react";
import { Moon, Sun, Search, X, Heart, ShoppingCart, Menu, LogOut, House, Box, CircleUserRound, ArrowRight, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";
import { Link } from "react-router-dom";
import api from "../lib/api";

export default function Header() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const navigate = useNavigate();

    const isLight = theme === 'light';

    const [searchValue, setSearchValue] = useState("");
    const [wishlistCount, setWishlistCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const bgContainer = isLight ? "bg-white/70" : "bg-gray-900/70";
    const bgComponent = isLight ? "bg-white" : "bg-gray-800";
    const bgSub = isLight ? "bg-gray-50" : "bg-gray-700";
    const textColor = isLight ? "text-gray-500" : "text-gray-200";
    const borderColor = isLight ? "border-gray-200" : "border-gray-700";

    const focusStyle = ({ isActive }) => {
        return {
            color: isActive ? "#ffffff" : "",
            backgroundColor: isActive ? "oklch(51.1% 0.262 276.966)" : ""
        };
    };

    const handleSearch = (event) => {
        if (event.key === "Enter") {
            navigate(`/products?search=${searchValue}`);
            setIsSearchExpanded(false);
        }
    };

    const toggleNav = () => {
        setIsNavExpanded(!isNavExpanded);
    };

    const getCartCount = async () => {
        if (!token) return;
        try {
            const res = await api.get("/carts");
            setCartCount(res.data.itemCount || 0);
        } catch (err) {
            console.log(err);
        }
    };

    const getWishlistCount = async () => {
        if (!token) return;
        try {
            const res = await api.get("/wishlists/my");
            setWishlistCount(res.data.wishlist?.products?.length || 0);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (token) {
            getWishlistCount();
            getCartCount();
        }

        const handleCartUpdate = () => getCartCount();
        const handleWishlistUpdate = () => getWishlistCount();

        window.addEventListener("cartUpdated", handleCartUpdate);
        window.addEventListener("wishlistUpdated", handleWishlistUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
            window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
        };
    }, [token]);

    return (
        <div className={`header ${bgContainer} bg-white/80 dark:bg-slate-900/90 w-full h-16 px-2 z-50 inset-0 fixed top-0 ${textColor} border-b ${borderColor} flex items-center justify-center`}>
            <div className={`headerContent w-full h-16 ${textColor} border-b ${borderColor} flex items-center justify-between px-5 pr-0`}>
                {isNavExpanded ? (
                    <div className={`w-90 absolute right-0 z-3 py-3 mt-50 ${bgComponent} shadow-lg border ${borderColor}`}>
                        <div className="w-full flex justify-between items-center px-5">
                            <div className="flex">
                                <div className="logo rounded-2xl overflow-hidden mr-3 text-2xl font-bold text-indigo-600"><img src={logoImage} alt="" className="w-18 h-12"/></div>
                                <div className="flex flex-col justify-center text-left">
                                    <h4 className="font-bold">eCommerc</h4>
                                    <p className="text-sm">Welcome</p>
                                </div>
                            </div>
                            <button onClick={toggleNav} className={`size-8  flex items-center justify-center text-sm rounded-xl ${isLight ? 'bg-gray-200' : 'bg-gray-600'} cursor-pointer`}>
                               <X /> 
                            </button>
                        </div>
                        <div className={`m-auto flex justify-around items-center my-2 w-75 h-15 rounded-2xl ${bgComponent}`}>
                            <NavLink to="/profile" className={`m-auto flex justify-around cursor-pointer p-1 border ${borderColor} hover:bg-indigo-100 items-center my-2 w-100 h-15 rounded-2xl ${bgComponent}`}>
                                <div className="bg-indigo-600 text-white flex justify-center items-center size-10 rounded-full">A</div>
                                <div className="text-left flex flex-col w-[75%]">
                                    <h4 className="font-bold">Admin Acount</h4>
                                    <p className="text-sm font-bold text-indigo-600 flex items-center ">view profile <ArrowRight size={18} className="ml-1"/></p>
                                </div>
                            </NavLink>
                        </div>
                        <div className={`w-90 m-auto h-10 border-t ${borderColor} border-b overflow-y-scroll`}>
                            <ul className="text-left flex flex-col items-center justify-around gap-2 py-2 border border-gray-200">
                                <li><NavLink to="/" className="hover:bg-white hover:text-indigo-600 flex justify-between gap-2 px-30 py-1" style={focusStyle}><House /> Home</NavLink></li>
                                <li><NavLink to="/products" className="hover:bg-white hover:text-indigo-600 flex justify-between gap-2 px-30 py-1" style={focusStyle}><ShoppingCart/> Shop</NavLink></li>
                                <li><NavLink to="/orders" className="hover:bg-white hover:text-indigo-600 flex justify-between gap-2 px-30 py-1" style={focusStyle}><Box /> Orders</NavLink></li>
                                <li><NavLink to="/wishlist" className="hover:bg-white hover:text-indigo-600 flex justify-between gap-2 px-30 py-1" style={focusStyle}><Heart/> Wishlist</NavLink></li>
                                <li><NavLink to="/profile" className="hover:bg-white hover:text-indigo-600 flex justify-between gap-2 px-30 py-1" style={focusStyle}><CircleUserRound /> Profile</NavLink></li>
                            </ul>
                        </div>
                        <NavLink to="/login" className="w-75 h-12 hover:bg-red-100 text-red-500 font-bold flex justify-center items-center rounded-2xl bg-red-50 m-auto border border-red-500 my-5">
                           <LogOut size={18} className="mr-2"/> Log out 
                        </NavLink>
                    </div>
                ) : (
                    <>
                     <Link to="/">
                        <img src={logoImage} alt="" className="w-18 h-12" />
                     </Link>
                        <ul className={`hidden md:flex items-center ${bgSub} shadow-sm px-3  py-2 rounded-3xl border ${borderColor}`}>
                            <li><NavLink to="/" className="rounded-full px-4 hover:bg-white hover:text-indigo-600 flex justify-between gap-2 text-sm py-1 mx-1" style={focusStyle}>Home</NavLink></li>
                            <li><NavLink to="/products" className="rounded-full px-4 hover:bg-white hover:text-indigo-600 flex justify-between gap-2 text-sm py-1 mx-1" style={focusStyle}>Shop</NavLink></li>
                            <li><NavLink to="/orders" className="rounded-full px-4 hover:bg-white hover:text-indigo-600 flex justify-between gap-2 text-sm py-1 mx-1" style={focusStyle}>Orders</NavLink></li>
                            <li><NavLink to="/wishlist" className="rounded-full px-4 hover:bg-white hover:text-indigo-600 flex justify-between gap-2 text-sm py-1 mx-1" style={focusStyle}>Wishlist</NavLink></li>
                        </ul>
                        <ul className={`flex items-center ${textColor} justify-around leading-3 px-5 h-10 rounded-3xl`}>
                           <li className={`${isNavExpanded? 'flex':'hidden'} sm:flex`}>
        {isSearchExpanded ?(  <div className="bg-gray-50 dark:bg-slate-900/60 px-3 py-1 rounded-3xl border text-sm border-gray-200 flex items-center justify-between shadow-sm">
             <input
              type="text"
             placeholder="Search..."
             value={searchValue}
             onChange={(e) => setSearchValue(e.target.value)}
             onKeyDown={handleSearch}
              className="bg-gray-50 dark:bg-slate-900/60 focus:outline-none"
             />
             <button onClick={()=>setIsSearchExpanded(false)} className="size-8 text-sm hover:bg-white dark:hover:text-black rounded-full px-1 flex items-center justify-center"><X size={16} /></button>
       </div>):<button onClick={() => setIsSearchExpanded(true)} className=" flex items-center cursor-pointer hover:text-indigo-600 hover:bg-white justify-center p-3 mx-2 shadow-sm  rounded-full   bg-gray-50 "><Search size={16} className="dark:text-gray-800" /></button>}
       </li>
                            <li>
                                <button onClick={() => toggleTheme()} className={`flex items-center cursor-pointer hover:text-indigo-600 hover:bg-white justify-center size-8 mx-2 shadow-sm rounded-full ${bgSub}`}>
                                    <span className="text-sm">{isLight ? <Moon size={16}/> : <Sun size={16}/>} </span>
                                </button>
                            </li>
                            <li className={`flex items-center cursor-pointer hover:text-indigo-600 hover:bg-white justify-center p-2 size-8 mx-1 shadow-sm rounded-full ${bgSub}`}>
                              <NavLink to="/wishlist" className="relative">
                                   <Heart size={16} />
                                   {wishlistCount > 0 && (
                                      <span className="absolute -top-2 left-3 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">  {wishlistCount} </span>
                                   )}
                              </NavLink>
                           </li>
                            <li className={`relative flex items-center cursor-pointer hover:text-indigo-600 hover:bg-white justify-center p-2 size-8 mx-1 shadow-sm rounded-full ${bgSub}`}>
                              <NavLink to="/cart">
                                 <ShoppingCart size={16} />
                                    {cartCount > 0 && (
                                     <span className="absolute -top-[1.5px] -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">  {cartCount} </span>
                                  )}
                              </NavLink>
                          </li>
                            <li className={`hidden md:flex items-center cursor-pointer justify-center py-0 w-25 h-9 px-1 mx-1 rounded-full ${bgSub} shadow-sm hover:bg-white hover:text-indigo-600 transition-all`}>
                              {token ? (
                                  <NavLink to="/profile" className="flex  w-auto items-center justify-between gap-2 text-xs p-3">
                                     <User size={16} />
                                     {(user?.firstName || user?.name || user?.username)?.split(" ")[0]}
                                  </NavLink>
                                ) : (
                                 <NavLink to="/login" className="flex items-center justify-between gap-2 text-sm">
                                     <User size={18} />  Login
                                   </NavLink>
                                )}
                           </li>
                            <li className={`flex md:hidden items-center cursor-pointer hover:text-indigo-600 hover:bg-white justify-center p-2 size-8 mx-1 shadow-sm rounded-full ${bgSub}`}>
                                <button onClick={toggleNav}><Menu size={16}/></button>
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}