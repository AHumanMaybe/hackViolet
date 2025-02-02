import { useLocation } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Navbar() {
    return (
        <aside className="fixed left-0 flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto">
            <a href="#">
                <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="Logo" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <a className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-full dark:bg-white dark:text-gray-200" href="#">
                        <span className="mx-4 font-medium">Dashboard</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-full hover:bg-gray-100 hover:text-gray-700" href="#">
                        <span className="mx-4 font-medium">Calendar</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-full hover:bg-gray-100 hover:text-gray-700" href="#">
                        <span className="mx-4 font-medium">Statistics</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-full hover:bg-gray-100 hover:text-gray-700" href="#">
                        <span className="mx-4 font-medium">Settings</span>
                    </a>
                </nav>

                <a href="#" className="flex items-center px-4 -mx-2">
                    <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">Sign Out</span>
                </a>
            </div>
        </aside>
    );
}

export default Navbar;