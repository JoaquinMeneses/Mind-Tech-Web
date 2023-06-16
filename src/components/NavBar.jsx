import React, {useState} from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import Account from "./Account.jsx";
import useStore from "../store/store";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token,cart} = useStore();

  return (
    <div className="fixed z-10 bg-[#000000f1] text-white mx-auto px-5 py-3 flex  sm:justify-between items-center justify-between w-full h-[10vh]  font-montserrat">
      <a className=" mob:mt-6 text-[24px] w-[278px] lg:w-[30%] h-[8vh] justify-center  flex flex-col items-center hover:text-[#cacaca] transition-colors cursor-pointer tracking-[20px] sm:tracking-[10px] font-semibold mob:text-[14px] mob:tracking-[10px] mob:w-[160px]  sm:text-[14px]  sm:w-[160px]   ">
        <p className="lg:text-[24px] lg:tracking-[20px] xl:tracking-[30px]">
          MINDTECH
        </p>
        <p className="text-[16px] sm:text-[8px] font-light lg:tracking-[20px] mob:text-[6px]">
          TECHNO
        </p>
      </a>

      <button
        className="sm:hidden text-white text-xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      <div
        className={`  sm:w-[80%] sm:flex flex-grow ${
          menuOpen ? "block" : "hidden"
        } mob:absolute mob:right-[140px] mob:top-[20px] sm:h-[8vh] sm:items-center  lg:w-[70%]  `}
      >
        <ul className="flex  flex-col sm:flex-row  sm:w-[100%] sm:justify-evenly mob:absolute mob:bg-[#000000e0] mob:rounded-[2%] mob:p-1 ">
          <li className="text-lg font-medium sm:mr-4 sm:text-[11px] md:text-[16px] hover:border-b-[1px]  hover:border-white ">
            <Link to="/">Home</Link>
          </li>
          {!token && (
            <li className="text-lg font-medium sm:mr-4 sm:text-[11px] md:text-[16px] hover:border-b-[1px] hover:border-white">
              <Link to="/auth-form">Login | Register</Link>
            </li>
          )}
          <li className="text-lg font-medium sm:mr-4 sm:text-[11px] md:text-[16px] hover:border-b-[1px] hover:border-white">
            <Link to="/store">Store</Link>
          </li>

          <div className="hover:cursor-pointer mob:flex-col   flex justify-evenly sm:items-center sm:ml-2 w-[90px]    ">
          <div className="mr-[-50px] mt-[-20px] z-1">
          {cart?.products?.length && token ?(
                <p className="z-50 flex justify-center items-center text-[1.5vh]  bg-red-600 rounded-full h-[15px] w-[15px]">
                  {cart?.products?.length}
                </p>
              ):(null) }
              </div>
              <div className="z-30">
            {token && <Cart />}
            </div>
            
            {token && <Account />}
          </div>
        </ul>
      </div>
    </div>
  );
}
