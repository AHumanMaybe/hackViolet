import { useLocation } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import logo from '../assets/lunaflow-img2.png';


function Navbar() {
    return (
        <aside className="font-primary fixed left-2 flex flex-col w-90 h-screen px-4 py-8 overflow-y-auto">
            <a href="#">
                <img className="w-auto scale-180 h-6 pl-12 sm:h-7" src={logo} alt="Luna Flow" />
            </a>
    
            <div className="flex flex-col justify-between flex-1 pt-16 mt-6">
                <nav>
                    <a className="flex items-center px-4 py-2 text-gray-500 text-xl bg-white/70 rounded-full hover:text-black" href="dash">
                        <span className="mx-4 font-medium">Dashboard</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-500 text-xl transition-colors duration-300 transform rounded-full hover:bg-gray-100 hover:text-black" href="#">
                        <span className="mx-4 font-medium">Calendar</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-500 text-xl transition-colors duration-300 transform rounded-full hover:bg-gray-100 hover:text-black" href="#">
                        <span className="mx-4 font-medium">Statistics</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-500 text-xl transition-colors duration-300 transform rounded-full hover:bg-gray-100 hover:text-black" href="#">
                        <span className="mx-4 font-medium">Settings</span>
                    </a>
                </nav>
    
                <a href="#" className="flex items-center px-4 -mx-2">
                    <span className="mx-2 font-medium text-lg text-gray-500 drop-shadow-sm" >Sign Out</span>
                </a>
            </div>
        </aside>
    );
    
}

export default Navbar;