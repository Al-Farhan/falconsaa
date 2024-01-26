import Link from "next/link";
import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

const BottomNavbar = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
      <Link href={"/"}>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
        >

          <IoMdHome className="mb-2 text-3xl text-pink-500" />

          <span className="text-sm text-pink-500">
            
                Home
            
          </span>
        </button>
        </Link>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
        >
          
          <FaSearch className="text-2xl mb-2 text-pink-500" />
          <span className="text-sm text-pink-500">
            Search
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
        >
          <BiCategory className="text-2xl mb-2 text-pink-500"/>
          <span className="text-sm text-pink-500">
            Category
          </span>
        </button>
        <button
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group"
        >
          
          <FaUserCircle className="text-2xl mb-2 text-pink-500" />

          <span className="text-sm text-pink-500">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar;
