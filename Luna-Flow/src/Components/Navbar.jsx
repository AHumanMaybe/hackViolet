import { useNavigate, useLocation } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import { useState } from "react";
import logo from '../assets/lunaflow-img.png';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current URL

    // Function to determine if the nav item is active
    const isActive = (path) => location.pathname === path;

    const handleSignOut = () => {
        doSignOut();
        navigate("/login");
    };

    return (
        <aside className="font-primary fixed left-2 flex flex-col w-90 h-screen px-4 py-8 overflow-y-auto">
            <a href="#">
                <img className="w-auto scale-180 h-6 pl-12 sm:h-7" src={logo} alt="Luna Flow" />
            </a>
    
            <div className="flex flex-col justify-between flex-1 pt-16 mt-6">
                <nav>
                    {[
                        { name: "Dashboard", path: "/dash" },
                        { name: "Calendar", path: "/eventcalendar" },
                        { name: "Statistics", path: "/stats" },
                        { name: "Settings", path: "/settings" },
                    ].map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center px-4 py-2 text-gray-500 text-xl bg-white rounded-full focus-outline:2 hover:text-black transition-colors duration-300 transform 
                                ${isActive(item.path) ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700"}`}
                        >
                            <span className="mx-4 font-medium">{item.name}</span>
                        </button>
                    ))}
                </nav>

                <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-full hover:bg-red-500 hover:text-white"
                >
                    <span className="mx-2 font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
    
}

export default Navbar;
